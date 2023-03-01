"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnsiFormats = exports.LogLevels = exports.Logger = void 0;
const date_1 = require("@james-bennett-295/date");
const AnsiFormats_1 = __importDefault(require("./AnsiFormats"));
exports.AnsiFormats = AnsiFormats_1.default;
var LogLevels;
(function (LogLevels) {
    LogLevels[LogLevels["Debug"] = 0] = "Debug";
    LogLevels[LogLevels["Info"] = 1] = "Info";
    LogLevels[LogLevels["Warn"] = 2] = "Warn";
    LogLevels[LogLevels["Error"] = 3] = "Error";
    LogLevels[LogLevels["Fatal"] = 4] = "Fatal";
})(LogLevels || (LogLevels = {}));
exports.LogLevels = LogLevels;
const ansiReset = "\x1b[0m";
function buildAnsi(formats) {
    if (formats.length === 0)
        return "";
    return "\x1b[" + formats.join(";") + "m";
}
const defaultConfig = {
    level: LogLevels.Info,
    formats: {
        [LogLevels.Debug]: [AnsiFormats_1.default.LightGreen],
        [LogLevels.Info]: [AnsiFormats_1.default.White],
        [LogLevels.Warn]: [AnsiFormats_1.default.LightYellow],
        [LogLevels.Error]: [AnsiFormats_1.default.LightRed],
        [LogLevels.Fatal]: [AnsiFormats_1.default.LightRed, AnsiFormats_1.default.Bold],
    },
    levelNames: {
        [LogLevels.Debug]: "DEBUG",
        [LogLevels.Info]: " INFO",
        [LogLevels.Warn]: " WARN",
        [LogLevels.Error]: "ERROR",
        [LogLevels.Fatal]: "FATAL",
    },
    dateFormat: "%Y-%m-%d  %H:%M:%S"
};
class Logger {
    constructor(config) {
        this.cfg = defaultConfig;
        this.onLog = null;
        Object.assign(this.cfg, config);
    }
    log(level, line, noEvent = false) {
        if (level < this.cfg.level)
            return;
        const levelName = this.cfg.levelNames[level];
        const dateStr = (new date_1.JDate()).formatDate(this.cfg.dateFormat);
        const txt = `[${dateStr} | ${levelName}]: ${line}`;
        const ansiStart = buildAnsi(this.cfg.formats[level]);
        const formattedLine = ansiStart + txt + ansiReset;
        const out = (level === LogLevels.Error || level === LogLevels.Fatal) ? "stderr" : "stdout";
        process[out].write(formattedLine + "\r\n");
        if (!noEvent && this.onLog !== null)
            this.onLog({
                level: level,
                line: txt,
                formattedLine: formattedLine
            });
    }
    debug(line) {
        this.log(LogLevels.Debug, line);
    }
    info(line) {
        this.log(LogLevels.Info, line);
    }
    warn(line) {
        this.log(LogLevels.Warn, line);
    }
    warnNoEvent(line) {
        this.log(LogLevels.Warn, line, true);
    }
    error(data) {
        var _a;
        const line = (typeof data === "string") ? data : ((_a = data.stack) !== null && _a !== void 0 ? _a : data.message);
        this.log(LogLevels.Error, line);
    }
    errorNoEvent(data) {
        var _a;
        const line = (typeof data === "string") ? data : ((_a = data.stack) !== null && _a !== void 0 ? _a : data.message);
        this.log(LogLevels.Error, line, true);
    }
    fatal(data) {
        var _a;
        const line = (typeof data === "string") ? data : ((_a = data.stack) !== null && _a !== void 0 ? _a : data.message);
        this.log(LogLevels.Fatal, line);
    }
    clearFormats() {
        this.cfg.formats = {
            [LogLevels.Debug]: [],
            [LogLevels.Info]: [],
            [LogLevels.Warn]: [],
            [LogLevels.Error]: [],
            [LogLevels.Fatal]: [],
        };
    }
}
exports.Logger = Logger;
