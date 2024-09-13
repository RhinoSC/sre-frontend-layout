import { Configschema, RunArray } from "@sre-frontend-layout/types/schemas";
import { login } from "./util/api/axios";
import { get } from "./util/nodecg";
import { apiGetScheduleByID, apiGetSchedules } from "./util/api/schedule/schedule";
import { runArray, prizes, totalDonated } from "./util/replicants";
import { apiGetPrizes } from "./util/api/prize/prize";
import { Prize } from "@sre-frontend-layout/types";
import { apiGetTotalDonatedByEventID } from "./util/api/donation/donation";
import { APIResponse } from "@sre-frontend-layout/types/Api";


const nodecg = get();

const config = nodecg.bundleConfig as Configschema;


async function start() {
  const response = await login(config.API_USERNAME, config.API_PASSWORD)
  await loadPrizes()
  // await loadTotalDonated()
}

start()
// start().then(() => {
//   setTimeout(async () => {
//     // const response = await apiGetSchedules()
//     // nodecg.sendMessage("apiSetSchedule")
//     // const response = await apiGetScheduleByID(`${config.API_SCHEDULE_ID}`)
//     // nodecg.log.info('[api]', response.data)
//     await loadSchedule()
//   }, 3000);
// })


async function loadSchedule(): Promise<RunArray> {
  const response = await apiGetScheduleByID("schedule1")

  runArray.value = response.data.ordered_runs
  // runArray.value = []

  nodecg.log.info("[schedule] imported")
  return response.data.ordered_runs
}

async function loadPrizes(): Promise<Prize[]> {
  const response = await apiGetPrizes()

  prizes.value = response.data
  // prizes.value = []

  nodecg.log.info("[prizes] imported")
  return response.data
}

async function loadTotalDonated(): Promise<number> {
  const response: APIResponse<number> = await apiGetTotalDonatedByEventID("event1")

  totalDonated.value = response.data

  nodecg.log.info("[donation] total donated imported")
  return response.data
}

nodecg.listenFor('importSchedule', (data: any, ack: any) => {
  loadSchedule()
    .then((data_) => ack(null, data_))
    .catch((err) => ack(err));
});