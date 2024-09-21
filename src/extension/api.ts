import { Configschema, RunArray } from "@sre-frontend-layout/types/schemas";
import { login } from "./util/api/axios";
import { get } from "./util/nodecg";
import { apiGetScheduleByID, apiGetSchedules } from "./util/api/schedule/schedule";
import { runArray, prizes, totalDonated, runsWithBids } from "./util/replicants";
import { apiGetPrizes } from "./util/api/prize/prize";
import { Bid, Prize } from "@sre-frontend-layout/types";
import { apiGetTotalDonatedByEventID } from "./util/api/donation/donation";
import { APIResponse } from "@sre-frontend-layout/types/Api";
import bodyParser from "body-parser";
import { RequestHandler } from "express";
import { apiGetBids } from "./util/api/bid/bid";
import { apiGetRuns } from "./util/api/run/run";


const nodecg = get();

const config = nodecg.bundleConfig as Configschema;


async function start() {
  await loadLogin()
  await loadPrizes()
  await loadBids()
  await loadTotalDonated()
}

async function reload() {
  await loadSchedule()
  await loadBids()
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

async function loadBids() {
  const response = await apiGetRuns("bids")

  let filteredRuns = response.data.filter((run) => run.schedule_id === config.API_SCHEDULE_ID && run.status === "active" && run.bids !== undefined)
  filteredRuns = filteredRuns.sort((a, b) => {
    if (a.start_time_mili < b.start_time_mili) {
      return -1;
    } else if (a.start_time_mili < b.start_time_mili) {
      return 1;
    }
    return 0;
  })

  filteredRuns.forEach(run => {
    if (run.bids) {
      run.bids.forEach(bid => {
        if (bid.bid_options) {
          // Ordena las bid_options por current_amount en orden descendente
          bid.bid_options.sort((a, b) => b.current_amount - a.current_amount);
        }
      });
    }
  });

  runsWithBids.value = []
  runsWithBids.value.splice(0, runsWithBids.value.length, ...filteredRuns);

  nodecg.log.info("[bids] imported")
  return filteredRuns;
}

async function loadSchedule(): Promise<RunArray> {
  const response = await apiGetScheduleByID(config.API_SCHEDULE_ID)

  runArray.value = []
  runArray.value.splice(0, runArray.value.length, ...response.data.ordered_runs);

  nodecg.log.info("[schedule] imported")
  return response.data.ordered_runs
}

async function loadPrizes(): Promise<Prize[]> {
  const response = await apiGetPrizes()

  prizes.value = []
  prizes.value.splice(0, response.data.length, ...response.data)

  nodecg.log.info("[prizes] imported")
  return response.data
}

async function loadTotalDonated(): Promise<number> {
  try {
    const response: APIResponse<number> = await apiGetTotalDonatedByEventID(config.API_EVENT_ID)

    totalDonated.value = response.data

    nodecg.log.info("[donation] total donated imported")
    return response.data
  } catch (error) {
    totalDonated.value = 0
    return 0
  }

}

nodecg.listenFor('importSchedule', (data: any, ack: any) => {
  reload()
    .then((data_) => ack(null, data_))
    .catch((err) => ack(err));
});

const app = nodecg.Router();

app.use(bodyParser.json({ limit: '50mb' }) as RequestHandler)
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }) as RequestHandler)

app.get(`/test`, (req, res) => {
  res.send(`done!`);
});

app.post('/total-donated', async (req, res) => {
  try {
    await loadBids();
    await loadTotalDonated()
    nodecg.log.debug(`[Event] Get total donated from api`);
    res.json({ message: 'success' });
  } catch (error) {
    res.json({ error: error });
  }
});
nodecg.mount(app);