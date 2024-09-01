/* eslint-disable max-len */

import type { ActiveRun, ActiveRunNextRuns, ActiveRunSurroundingRuns, ExampleReplicant, RunArray, Timer, TimerChangesDisabled } from '@sre-frontend-layout/types/schemas';
import { get as nodecg } from './nodecg';
import { Bid, Prize, RunFinishTimes } from '@sre-frontend-layout/types';

/**
 * This is where you can declare all your replicant to import easily into other files,
 * and to make sure they have any correct settings on startup.
 */

// YOU CAN REMOVE THIS RULE WHEN YOU GET MULTIPLE REPLICANTS!
// eslint-disable-next-line import/prefer-default-export
export const exampleReplicant = nodecg().Replicant<ExampleReplicant>('exampleReplicant');
export const activeRun = nodecg().Replicant<ActiveRun>('activeRun');
export const activeRunSurroundingRuns = nodecg().Replicant<ActiveRunSurroundingRuns>('activeRunSurroundingRuns');
export const activeRunNextRuns = nodecg().Replicant<ActiveRunNextRuns>('activeRunNextRuns');
export const runArray = nodecg().Replicant<RunArray>('runArray');
export const runFinishTimes = nodecg().Replicant<RunFinishTimes>('runFinishTimes');
export const timer = nodecg().Replicant<Timer>('timer', { persistenceInterval: 100 });
export const timerChangesDisabled = nodecg().Replicant<TimerChangesDisabled>('timerChangesDisabled');
export const totalDonated = nodecg().Replicant<number>('totalDonated');
export const bids = nodecg().Replicant<Bid[]>('bids');
export const prizes = nodecg().Replicant<Prize[]>('prizes');
export const currentSong = nodecg().Replicant<string>('currentSong');
export const apiToken = nodecg().Replicant<string>('apiToken')




