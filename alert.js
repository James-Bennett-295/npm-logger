"use strict";

const axios = require("axios");
const fs = require("fs");

function alert(log, cfg) {

    let packages = [];
    fs.readFile("./package.json", "utf-8", (err, data) => {

        if (err) return log("[LOGGER]: AN ERROR OCCURED WHILE TRYING TO READ package.json: " + err, "ERROR");

        let packages = Object.keys(JSON.parse(data).dependencies);

        axios.get("https://api.github.com/gists/24207bc76873402749c7c155eb17b0e8")
            .then((res) => {

                let data = JSON.parse(res.data.files["jbLoggerAlerts.json"].content).v1;

                let forPackagesKeys;
                for (let i in data) {
                    forPackagesKeys = Object.keys(data[i].forPackages);
                    for (let j in forPackagesKeys) {
                        if (!packages.includes(forPackagesKeys[j])) continue;
                        log(data[i].msg.join("\n"), "ALERT");
                        break;
                    };
                };

            });

    });

};

module.exports = alert;
