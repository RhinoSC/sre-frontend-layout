import { Run, User, Team } from "@sre-frontend-layout/types";
import { ActiveRun, ActiveRunNextRuns } from "@sre-frontend-layout/types/schemas";
import clone from "clone";
import _ from "lodash";
import { resetTimer } from "./timer";
import { findRunIndexFromId, msToTimeStr, timeStrToMS, to } from "./util/helpers";
import { get } from "./util/nodecg";
import { activeRun, activeRunSurroundingRuns, runArray, activeRunNextRuns, timer } from "./util/replicants";

const nodecg = get();

function changeNextRuns(): void {
  const quantity = 3
  let nextRunsArray: string[] | undefined = []
  if (!activeRun.value) {
    // No current run set, we must be at the start an get 4 runs.
    // console.log(runArray.value)
    if(!runArray.value){
      // console.log(runArray.value)
      return
    }
    for (let i = 0; i < quantity && i < runArray.value.length; i++) {
      nextRunsArray.push(runArray.value[i].id)
    }
    activeRunNextRuns.value = nextRunsArray as ActiveRunNextRuns
  } else {
    let currentIndex = findRunIndexFromId(activeRun.value.id);
    // currentIndex += 1
    if (currentIndex === -1) {
      activeRunNextRuns.value = nextRunsArray as ActiveRunNextRuns
      return
    }
    for (let i = currentIndex; i < (currentIndex + quantity) && i < runArray.value.length; i++) {
      nextRunsArray.push(runArray.value[i].id)
    }
    activeRunNextRuns.value = nextRunsArray as ActiveRunNextRuns
  }
  nodecg.log.debug('[Run Control] Recalculated next runs');
}

/**
 * Used to update the replicant that stores ID references to previous/current/next runs.
 */
function changeSurroundingRuns(): void {
  let previous: Run | undefined;
  let current: Run | undefined;
  let next: Run | undefined;

  if (!activeRun.value) {
    // No current run set, we must be at the start, only set that one.
    // if (runArray.value) {
    //   console.log("prueba")
    //   console.log(runArray.value[0])
    //   return
    // }
    if (runArray.value) {
      if (runArray.value[0]) {
        [next] = runArray.value;
      }
    }
  } else {
    current = activeRun.value; // Current will always be the active one.

    // Try to find currently set runs in the run data array.
    const currentIndex = findRunIndexFromId(current.id);
    const previousIndex = findRunIndexFromId(activeRunSurroundingRuns.value.previous);
    const nextIndex = findRunIndexFromId(activeRunSurroundingRuns.value.next);

    if (currentIndex >= 0) { // Found current run in array.
      if (currentIndex > 0) {
        [previous, , next] = runArray.value.slice(currentIndex - 1);
      } else { // We're at the start and can't splice -1.
        [, next] = runArray.value.slice(0);
      }
    } else if (previousIndex >= 0) { // Found previous run in array, use for reference.
      [previous, , next] = runArray.value.slice(previousIndex);
    } else if (nextIndex >= 0) { // Found next run in array, use for reference.
      [previous, , next] = runArray.value.slice(nextIndex - 2);
    }
  }

  activeRunSurroundingRuns.value = {
    previous: (previous) ? previous.id : undefined,
    current: (current) ? current.id : undefined,
    next: (next) ? next.id : undefined,
  };

  nodecg.log.debug('[Run Control] Recalculated surrounding runs');
}

/**
 * Used to update the Twitch information, used by functions in this file.
 * @param runData Run Data object.
 */
async function updateTwitchInformation(runData: Run): Promise<boolean> {


  // Attempts to find the correct Twitch game directory.
  let { run_metadata } = runData;

  return !run_metadata.twitch_game_name;
}

/**
 * Change the active run to the one specified if it exists.
 * @param id The unique ID of the run you wish to change to.
 */
async function changeActiveRun(id?: string): Promise<boolean> {
  try {
    if (['running', 'paused'].includes(timer.value.state)) {
      throw new Error('Timer is running/paused');
    }
    if (!id) {
      throw new Error('No run ID was supplied');
    }
    const runData = runArray.value.find((run) => run.id === id);
    if (!runData) {
      throw new Error(`Run with ID ${id} was not found`);
    } else {
      const noTwitchGame = await updateTwitchInformation(runData);
      activeRun.value = clone(runData);
      to(resetTimer(true));
      nodecg.log.debug(`[Run Control] Active run changed to ${id}`);
      return noTwitchGame;
    }
  } catch (err) {
    nodecg.log.debug('[Run Control] Could not successfully change active run:', err);
    throw err;
  }
}

/**
 * Deletes a run from the run data array.
 * @param id The unique ID of the run you wish to delete.
 */
async function removeRun(id?: string): Promise<void> {
  try {
    if (!id) {
      throw new Error('No run ID was supplied');
    }
    const runIndex = runArray.value.findIndex((run) => run.id === id);
    if (runIndex < 0) {
      throw new Error(`Run with ID ${id} was not found`);
    } else {
      runArray.value.splice(runIndex, 1);
      nodecg.log.debug(`[Run Control] Successfully removed run ${id}`);
      return;
    }
  } catch (err) {
    nodecg.log.debug('[Run Control] Could not successfully remove run:', err);
    throw err;
  }
}

/**
 * Either edits a run (if we currently have it) or adds it.
 * @param runData Run Data object.
 * @param prevID ID of the run that this run will be inserted after if applicable.
 * @param twitch Whether to update the Twitch information as well.
 */
async function modifyRun(runData: Run, prevID?: string, twitch = false): Promise<boolean> {
  try {
    // Loops through data, removes any keys that are falsey.
    const data = _.pickBy(runData, _.identity) as Run;
    data.teams = data.teams.map((team) => {
      const teamData = _.pickBy(team, _.identity) as Team;
      teamData.players = teamData.players.map((player) => {
        const playerData = _.pickBy(player, _.identity) as User;
        const socials = _.pickBy(playerData.socials, _.identity);
        playerData.socials.id = socials.id!
        playerData.socials.twitch = socials.twitch!
        playerData.socials.twitter = socials.twitter
        playerData.socials.youtube = socials.youtube
        playerData.socials.facebook = socials.facebook
        return playerData;
      });
      return teamData;
    });

    // Check all teams have players, if not throw an error.
    if (!data.teams.every((team) => !!team.players.length)) {
      throw new Error('Team(s) are missing player(s)');
    }

    // Check all players have names, if not throw an error.
    const allNamesAdded = data.teams.every((team) => (
      team.players.every((player) => !!player.name)
    ));
    if (!allNamesAdded) {
      throw new Error('Player(s) are missing name(s)');
    }

    // If set as relay, set any missing indexes if needed. If the opposite, delete them.
    // if (runData.relay) {
    //   data.teams = data.teams.map((team) => ({ relayPlayerID: team.players[0]?.id, ...team }));
    // } else {
    //   for (const team of data.teams) {
    //     delete team.relayPlayerID;
    //   }
    // }

    // Verify and convert estimate.
    // if (data.estimate) {
    //   if (data.estimate.match(/^(\d+:)?(?:\d{1}|\d{2}):\d{2}$/)) {
    //     const ms = timeStrToMS(data.estimate);
    //     data.estimate = msToTimeStr(ms);
    //     data.estimateS = ms / 1000;
    //   } else { // Throw error if format is incorrect.
    //     throw new Error('Estimate is in incorrect format');
    //   }
    // } else {
    //   delete data.estimate;
    //   delete data.estimateS;
    // }

    // // Verify and convert setup time.
    // if (data.setupTime) {
    //   if (data.setupTime.match(/^(\d+:)?(?:\d{1}|\d{2}):\d{2}$/)) {
    //     const ms = timeStrToMS(data.setupTime);
    //     data.setupTime = msToTimeStr(ms);
    //     data.setupTimeS = ms / 1000;
    //   } else { // Throw error if format is incorrect.
    //     throw new Error('Setup time is in incorrect format');
    //   }
    // } else {
    //   delete data.setupTime;
    //   delete data.setupTimeS;
    // }

    const index = findRunIndexFromId(data.id);
    if (index >= 0) { // Run already exists, edit it.
      if (activeRun.value && data.id === activeRun.value.id) {
        activeRun.value = clone(data);
      }
      runArray.value[index] = clone(data);
    } else { // Run is new, add it.
      const prevIndex = findRunIndexFromId(prevID);
      runArray.value.splice(prevIndex + 1 || runArray.value.length, 0, clone(data));
    }

    const noTwitchGame = (twitch) ? await updateTwitchInformation(runData) : false;
    return noTwitchGame;
  } catch (err) {
    nodecg.log.debug('[Run Control] Could not successfully modify run:', err);
    throw err;
  }
}

/**
 * Modifies the relay player ID of a team inside of a run.
 * @param runID ID of the run you wish to modify.
 * @param teamID ID of the team inside of the run you wish to modify.
 * @param playerID ID of the player you wish to set as the one currently playing.
 */
// async function modifyRelayPlayerID(runID: string, teamID: string, playerID: string): Promise<void> {
//   try {
//     const run = clone(runArray.value.find((r) => r.id === runID));
//     if (!run) {
//       throw new Error(`Run with ID ${runID} was not found`);
//     }
//     if (!run.relay) {
//       throw new Error(`Run with ID ${runID} is not set as a relay`);
//     }
//     const teamIndex = run.teams.findIndex((t) => t.id === teamID);
//     if (teamIndex < 0) {
//       throw new Error(`Team with ID ${runID} was not found`);
//     }
//     const player = run.teams[teamIndex].players.find((p) => p.id === playerID);
//     if (!player) {
//       throw new Error(`Player with ID ${playerID} was not found`);
//     }
//     run.teams[teamIndex].relayPlayerID = player.id;
//     await modifyRun(run);
//   } catch (err) {
//     nodecg.log.debug('[Run Control] Could not successfully modify relay player ID:', err);
//     throw err;
//   }
// }

/**
 * Removes the active run from the relevant replicant.
 */
async function removeActiveRun(): Promise<void> {
  try {
    if (['running', 'paused'].includes(timer.value.state)) {
      throw new Error('Timer is running/paused');
    }
    (activeRun.value as ActiveRun | undefined) = undefined;
    to(resetTimer(true));
    nodecg.log.debug('[Run Control] Successfully removed active run');
  } catch (err) {
    nodecg.log.debug('[Run Control] Could not successfully remove active run:', err);
  }
}

/**
 * Removes all runs in the array and the currently active run.
 */
async function removeAllRuns(): Promise<void> {
  try {
    if (['running', 'paused'].includes(timer.value.state)) {
      throw new Error('Timer is running/paused');
    }
    runArray.value.length = 0;
    removeActiveRun();
    to(resetTimer(true));
    nodecg.log.debug('[Run Control] Successfully removed all runs');
  } catch (err) {
    nodecg.log.debug('[Run Control] Could not successfully remove all runs:', err);
    throw err;
  }
}

// NodeCG messaging system.
nodecg.listenFor('changeActiveRun', (id, ack: any) => {
  changeActiveRun(id)
    .then((noTwitchGame) => ack(null, noTwitchGame))
    .catch((err) => ack(err));
});
nodecg.listenFor('removeRun', (id, ack: any) => {
  removeRun(id)
    .then(() => ack(null))
    .catch((err) => ack(err));
});
nodecg.listenFor('modifyRun', (data, ack: any) => {
  modifyRun(data.runData, data.prevID, data.updateTwitch)
    .then((noTwitchGame) => ack(null, noTwitchGame))
    .catch((err) => ack(err));
});
// nodecg.listenFor('modifyRelayPlayerID', (data, ack: any) => {
//   modifyRelayPlayerID(data.runID, data.teamID, data.playerID)
//     .then(() => ack(null))
//     .catch((err) => ack(err));
// });
nodecg.listenFor('changeToNextRun', async (data, ack: any) => {
  await changeActiveRun(activeRunSurroundingRuns.value.next)
    .then((noTwitchGame) => ack(null, noTwitchGame))
    .catch((err) => ack(err));
});
nodecg.listenFor('returnToStart', (data, ack: any) => {
  removeActiveRun()
    .then(() => ack(null))
    .catch((err) => ack(err));
});
nodecg.listenFor('removeAllRuns', (data, ack: any) => {
  removeAllRuns()
    .then(() => ack(null))
    .catch((err) => ack(err));
});

activeRun.on('change', changeSurroundingRuns);
runArray.on('change', changeSurroundingRuns);

activeRun.on('change', changeNextRuns);
runArray.on('change', changeNextRuns);

nodecg.log.info(`[Run Control] Loaded successfully`)