import { Configschema, RunArray } from "@sre-frontend-layout/types/schemas";
import { login } from "./util/api/axios";
import { get } from "./util/nodecg";
import { apiGetScheduleByID, apiGetSchedules } from "./util/api/schedule/schedule";
import { runArray } from "./util/replicants";


const nodecg = get();

const config = nodecg.bundleConfig as Configschema;


async function start() {
  const response = await login(config.API_USERNAME, config.API_PASSWORD)
}

start().then(() => {
  setTimeout(async () => {
    // const response = await apiGetSchedules()
    // nodecg.sendMessage("apiSetSchedule")
    // const response = await apiGetScheduleByID(`${config.API_SCHEDULE_ID}`)
    // nodecg.log.info('[api]', response.data)
    await loadSchedule()
  }, 3000);
})

async function loadSchedule(): Promise<RunArray> {
  const response = await apiGetScheduleByID("schedule1")

  runArray.value = response.data.ordered_runs
  // console.log(runArray.value)

  return response.data.ordered_runs
}

nodecg.listenFor('importSchedule', (data: any, ack: any) => {
  nodecg.log.info("[schedule] imported")
  loadSchedule()
    .then((data_) => ack(null, data_))
    .catch((err) => ack(err));
});