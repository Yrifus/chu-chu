import "core-js/stable";
import "regenerator-runtime/runtime";

import job from "./controllers/job";

async function main() {
        job.invoke();
}

main();
