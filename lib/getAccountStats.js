stats = [];
const moment = require("moment");

module.exports = (accountnumber) => {
    return new Promise((resolve, reject) => {
        var auth = "Basic " + Buffer.from("api:" + apiToken).toString("base64");

        // Request requires a duration which is done using either the current date or a range specified from the command line arguments. 
        var startdate = statsstartdate ? moment(statsstartdate) : moment();
        var enddate;

        if (statsenddate) {
            enddate = moment(statsenddate);
        } else if (!statsenddate && statsstartdate) {
            enddate = moment(statsstartdate);
        } else {
            enddate = moment();
        }
        if (statsenddate && !statsstartdate) reject("End date without start date");
        if (statsenddate && statsstartdate && (statsenddate < statsstartdate)) reject("End date before start date");

        var starttime = startdate.format("ddd, DD MMM YYYY 00:00:00 [GMT]");
        var endtime = enddate.format("ddd, DD MMM YYYY 23:59:59 [GMT]");

        httpclient
            .get(apiURL + accountnumber + "/stats/total", { "event": ["accepted", "delivered", "failed"], "start": starttime, "end": endtime })
            .set("Authorization", auth)
            .set("event", "accepted")
            .end(function (err, res) {
                try {
                    if (verbose) console.log("Account domain: " + accountnumber);
                    if (res.status != 200) {
                        console.log("failed");
                        resolve("Invalid accountnumber");
                        return;
                    }
                    if (verbose) console.log(res.text);
                    const response = JSON.parse(res.text);
                    for (var [key, value] of Object.entries(response["stats"])) {
                        const dateval = !raw ? new Date(value.time).toISOString().slice(0,10) : value.time;
                        stats.push({ "account": accountnumber, "date": dateval, "accepted": value.accepted.total, "delivered": value.delivered.total, "failed_temp": value.failed.temporary.total, "failed_perm": value.failed.permanent.total });
                    }
                    resolve("Completed Account Positions for " + accountnumber);
                } catch (e) {
                    reject(e);
                }
            });
    });
};
