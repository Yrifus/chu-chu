import schedule from "node-schedule";

import chuchu from "./chuchu";
import config from "../storage/config.json"

const job = schedule.scheduleJob(config.cron, () => {
    chuchu();
})

export default job;