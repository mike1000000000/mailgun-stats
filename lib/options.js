const { version, author } = require("../package.json");
verbose = false;
showjson = false;

// Parse arguments
module.exports = () => {
    const options = {
        alias: { v: "verbose", d: "domain", h: "help", V: "Version", j: "json", s: "startdate", e: "enddate", r: "rawdate" },
    };
    const args = require("minimist")(process.argv.slice(2), options);
    if (args["Version"]) {
        console.log(`v${version} - Written by ${author}`);
    }
    if (args["help"]) {
        const help = `
    Usage: mailgun-stats [command] [arguments] 
           
    Commands:
      allstats            Show a table of all domain stats 
                           example: mailgun-stats allstats

      domain              Show a table of specific domain stats
                           example: mailgun-stats www.example.com mg.example2.com

    Arguments:
      -s, --startdate     Output dates beginning on the specified date at 00:00:00 (yyyy-mm-dd)
                          Default is current server day.
                          If no end date specified will only return a single day. 

      -e, --enddate       Output dates ending on the specified date at 23:59:59 (yyyy-mm-dd)
                          Requires startdate to be used.

      -r, --rawdate       Provides the raw date output from the API. Defaults to "yyyy-mm-dd".

      -v, --verbose       Output json results for debugging
      -h, --help          Help, this menu
      -V, --Version       Prints version
      -j, --json          Outputs results in JSON only
  
      
    Written by Michel Noel © 2020
      `;
        console.log(help);
    }
    verbose = args["verbose"] ? true : false;
    showjson = args["json"] ? true : false;

    return args;
};
