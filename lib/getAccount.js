module.exports = () => {
    return new Promise((resolve, reject) => {
        var auth = "Basic " + Buffer.from("api:" + apiToken).toString("base64");
        httpclient
            .get(apiURL + "domains")
            .set("Authorization", auth)
            .end(function (err, res) {
                try {
                    if (verbose) console.log(res.text);
                    const response = JSON.parse(res.text);
                    for (var key in response["items"]) {
                        accounts.push(response["items"][key]["name"]);
                    }
                    resolve("Completed Account Query");
                } catch (e) {
                    reject(e);
                }
            });
    });
};
