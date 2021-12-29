function log(logLine, logType) {
    var d = new Date();
    var dateStr = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "  " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var formattedLogLine = "[" + dateStr + " | " + logType + "] " + logLine;
    console.log(formattedLogLine);
};

function info(logLine) { log(logLine, "INFO") };
function warn(logLine) { log(logLine, "WARN") };
function error(logLine) { log(logLine, "ERROR") };
function fatal(logLine) { log(logLine, "FATAL") };
function debug(logLine) { log(logLine, "DEBUG") };

module.exports = { info, warn, error, fatal, debug };
