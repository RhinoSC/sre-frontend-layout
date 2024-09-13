/* eslint-disable max-len */

import type { ActiveRun, ActiveRunNextRuns, ActiveRunSurroundingRuns, DefaultSetupTime, ExampleReplicant, RunArray, Timer, TimerChangesDisabled } from '@sre-frontend-layout/types/schemas';
import type NodeCG from '@nodecg/types';
import { get as nodecg } from './nodecg';
import { Bid, Prize, RunFinishTimes } from '@sre-frontend-layout/types';

/**
 * This is where you can declare all your replicant to import easily into other files,
 * and to make sure they have any correct settings on startup.
 */

// YOU CAN REMOVE THIS RULE WHEN YOU GET MULTIPLE REPLICANTS!
// eslint-disable-next-line import/prefer-default-export
export const exampleReplicant = nodecg().Replicant<ExampleReplicant>('exampleReplicant');
export const defaultSetupTime = nodecg().Replicant<DefaultSetupTime>('defaultSetupTime') as unknown as NodeCG.ServerReplicantWithSchemaDefault<DefaultSetupTime>;
export const activeRun = nodecg().Replicant<ActiveRun>('activeRun') as unknown as NodeCG.ServerReplicantWithSchemaDefault<ActiveRun>;
export const activeRunSurroundingRuns = nodecg().Replicant<ActiveRunSurroundingRuns>('activeRunSurroundingRuns') as unknown as NodeCG.ServerReplicantWithSchemaDefault<ActiveRunSurroundingRuns>;
export const activeRunNextRuns = nodecg().Replicant<ActiveRunNextRuns>('activeRunNextRuns') as unknown as NodeCG.ServerReplicantWithSchemaDefault<ActiveRunNextRuns>;
export const runArray = nodecg().Replicant<RunArray>('runArray', { defaultValue: [] }) as unknown as NodeCG.ServerReplicantWithSchemaDefault<RunArray>;
export const runFinishTimes = nodecg().Replicant<RunFinishTimes>('runFinishTimes') as unknown as NodeCG.ServerReplicantWithSchemaDefault<RunFinishTimes>;
export const timer = nodecg().Replicant<Timer>('timer', {
  persistenceInterval: 100, defaultValue: {
    time: '00:00:00',
    state: 'stopped',
    milliseconds: 0,
    timestamp: 0,
    teamFinishTimes: {},
  }
}) as unknown as NodeCG.ServerReplicantWithSchemaDefault<Timer>;
export const timerChangesDisabled = nodecg().Replicant<TimerChangesDisabled>('timerChangesDisabled') as unknown as NodeCG.ServerReplicantWithSchemaDefault<TimerChangesDisabled>;
export const totalDonated = nodecg().Replicant<number>('totalDonated');
export const bids = nodecg().Replicant<Bid[]>('bids');
export const prizes = nodecg().Replicant<Prize[]>('prizes');
export const activePrizes = nodecg().Replicant<Prize[]>('activePrizes');
export const currentSong = nodecg().Replicant<string>('currentSong');
export const apiToken = nodecg().Replicant<string>('apiToken', { persistent: true, persistenceInterval: 8.64e+7 })




