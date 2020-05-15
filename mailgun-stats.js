#!/usr/bin/env node
const start = new Date();

const getAccount = require("./lib/getAccount.js");
const getAccountStats = require("./lib/getAccountStats.js");
const showStatsTable = require("./lib/showStatsTable");

// Load command line options
const args = require("./lib/options.js")();
const { domain, help, Version, startdate } = args;
const cmd = args._[0];
accounts = [];

if (help || Version) process.exit(0);

apiToken = require("./config.json")["apiToken"];
apiURL = require("./config.json")["apiURL"];

statsstartdate = args["startdate"] || "" ;
statsenddate = args["enddate"] || "" ;
raw = args["rawdate"] ? true : false;

// http client
httpclient = require("superagent");

(async () => {
    try {
        if (verbose) {
            console.log("Current time:" + Math.round(new Date() / 1000));
        }

        if (!cmd) {
            console.log("\nNo command provided. Please see help by using the '--help' argument.\n");
            return;
        }

        switch (cmd.toLowerCase()) {
        case "allstats":
            await getAccount();

            for (const element of accounts) {
                await getAccountStats(element);
            }

            if (!stats.length) {
                console.log("No stats.");
                return;
            }
            showjson ? console.log(stats) : showStatsTable(stats);
            break;
        case "domain":

            for (const symbol of args._.slice(1)) {
                accounts.push(symbol.toString());
            }

            for (const element of accounts) {
                await getAccountStats(element);
            }

            if (!stats.length) {
                console.log("No stats.");
                return;
            }
            showjson ? console.log(stats) : showStatsTable(stats);
            break;

        default:
            console.log("No tool selected.");
        }
    } catch (e) {
        console.log("There was an error: " + e);
    }
})();

// Output script execution time upon exit.
process.on("beforeExit", async () => {
    var end = new Date() - start;
    if(verbose) console.info("Execution time: %dms", end);
    process.exit(0);
});
