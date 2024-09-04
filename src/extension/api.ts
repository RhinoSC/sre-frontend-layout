import { Configschema } from "@sre-frontend-layout/types/schemas";
import { login } from "./util/api/axios";
import { get } from "./util/nodecg";
import { apiGetScheduleByID, apiGetSchedules } from "./util/api/schedule/schedule";


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
  }, 3000);
})

async function setSchedule() {
  const response = await apiGetScheduleByID(`${config.API_SCHEDULE_ID}`)
  
  nodecg.log.info('[api] setted schedule from api: ', response)
}
// nodecg.listenFor('apiSetSchedule', async (data: any, ack: any) => {
//   nodecg.log.info('[api] setted schedule from api: ', config.API_SCHEDULE_ID)

//   ack(null, true)
// })