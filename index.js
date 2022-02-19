function log(logLine, logType) {
    let d = new Date();
    let dateStr = 
        d.getFullYear() + "-" +
        "00".slice(0, (0 - d.getMonth().toString().length)) + (d.getMonth() + 1) + "-" +
        "00".slice(0, (0 - d.getDate().toString().length)) + d.getDate() + "  " +
        "00".slice(0, (0 - d.getHours().toString().length)) + d.getHours() + ":" +
        "00".slice(0, (0 - d.getMinutes().toString().length)) + d.getMinutes() + ":" +
        "00".slice(0, (0 - d.getSeconds().toString().length)) + d.getSeconds();
    let formattedLogLine = "[" + dateStr + " | " + logType + "]: " + logLine;
    console.log(formattedLogLine);
};

function info(logLine) { log(logLine, "INFO") };
function warn(logLine) { log(logLine, "WARN") };
function error(logLine) { log(logLine, "ERROR") };
function fatal(logLine) { log(logLine, "FATAL") };
function debug(logLine) { log(logLine, "DEBUG") };

module.exports = { info, warn, error, fatal, debug };
