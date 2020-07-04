import {Service} from "node-windows";

const svc = new Service({
    name: "Chu Chu",
    description: "Relays FetchRSS Facebook feed to Chu Chu Discord Webhook.",
    script: __dirname + "/index.js"
})

svc.on('install',function(){
    svc.start();
  });
   
svc.install();

export default svc;
