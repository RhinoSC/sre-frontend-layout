import { Configschema, RunArray } from "@sre-frontend-layout/types/schemas";
import { login } from "./util/api/axios";
import { get } from "./util/nodecg";
import { apiGetScheduleByID, apiGetSchedules } from "./util/api/schedule/schedule";
import { runArray, prizes, totalDonated } from "./util/replicants";
import { apiGetPrizes } from "./util/api/prize/prize";
import { Prize } from "@sre-frontend-layout/types";
import { apiGetTotalDonatedByEventID } from "./util/api/donation/donation";
import { APIResponse } from "@sre-frontend-layout/types/Api";
import bodyParser from "body-parser";
import { RequestHandler } from "express";


const nodecg = get();

const config = nodecg.bundleConfig as Configschema;


async function start() {
  await loadLogin()
  await loadPrizes()
  await loadTotalDonated()
}


start()
setInterval(() => {
  start()
}, 8.28e+7);

async function loadLogin(): Promise<void> {
  await login(config.API_USERNAME, config.API_PASSWORD)
}

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

const app = nodecg.Router();

app.use(bodyParser.json({ limit: '50mb' }) as RequestHandler)
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }) as RequestHandler)

// API to show or hide the lower third
// USAGE: query /bundles/mybundle/api/lowerThird?action=show|hide
app.get(`/test`, (req, res) => {
  res.send(`done!`);
});

app.post('/total-donated', (req, res) => {
  try {
    loadTotalDonated()
    nodecg.log.debug(`[Event] Get total donated from api`);
    res.json({ message: 'success' });
  } catch (error) {
    res.json({ error: error });
  }
});
nodecg.mount(app);