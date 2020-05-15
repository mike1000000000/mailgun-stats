// CLI Table
var Table = require("cli-table");
var colors = require("colors");

module.exports = (stats) => {
    var table = new Table({
        head: [
            "Domain".brightCyan.bold,
            "Date".brightCyan.bold,
            "Accepted".brightCyan.bold,
            "Delivered".brightCyan.bold,
            "Failure Temp".brightCyan.bold,
            "Failure Perm".brightCyan.bold,
        ]
    });

    for (const values of stats) {
        table.push([
            values["account"],
            values["date"],
            values["accepted"],
            values["delivered"],
            values["failed_temp"],
            values["failed_perm"]
        ]);
    }
    console.log("\n" + table.toString());
};
