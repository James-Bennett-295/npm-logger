"use strict";

const axios = require("axios");
const fs = require("fs");

function alert(log, cfg) {

    let packages = [];
    fs.readFile("./package.json", "utf-8", (err, fileData) => {

        if (err) return log("[LOGGER]: AN ERROR OCCURED WHILE TRYING TO READ package.json: " + err, "ERROR");

        let packageJson = JSON.parse(fileData);
        let packages = Object.keys(packageJson.dependencies);

        axios.get("https://api.github.com/gists/24207bc76873402749c7c155eb17b0e8")
            .then((res) => {

                let data = JSON.parse(res.data.files["jbLoggerAlerts.json"].content).v2;

                let forPackagesKeys, installedV, alertV;
                for (let i in data) {
                    forPackagesKeys = Object.keys(data[i].forPackages);
                    for (let j in forPackagesKeys) {
                        if (!packages.includes(forPackagesKeys[j])) continue;
                        /////////
                        installedV = packageJson.dependencies[forPackagesKeys[j]];
                        alertV = data[i].forPackages[forPackagesKeys[j]];
                        if (installedV.startsWith('^')) installedV = installedV.slice(1);
                        if (alertV.startsWith('!')) {
                            alertV = alertV.slice(1);
                            if (installedV === alertV) continue;
                        };
                        //////////////
                        log(data[i].msg.join("\n"), "ALERT");
                        break;
                    };
                };

            });

    });

};

module.exports = alert;
