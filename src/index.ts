import { JDate } from "@james-bennett-295/date";
import AnsiFormats from "./AnsiFormats";

enum LogLevels {
	Debug,
	Info,
	Warn,
	Error,
	Fatal
}

type Config = {
	level: LogLevels;
	formats: {
		[key: number]: Array<AnsiFormats>
	};
	levelNames: {
		[key: number]: string
	};
	dateFormat: string;
}

const ansiReset = "\x1b[0m";

function buildAnsi(formats: Array<AnsiFormats>): string {
	if (formats.length === 0) return "";
	return "\x1b[" + formats.join(";") + "m";
}

const defaultConfig: Config = {
	level: LogLevels.Info,
	formats: {
		[LogLevels.Debug]: [AnsiFormats.LightGreen],
		[LogLevels.Info]: [AnsiFormats.White],
		[LogLevels.Warn]: [AnsiFormats.LightYellow],
		[LogLevels.Error]: [AnsiFormats.LightRed],
		[LogLevels.Fatal]: [AnsiFormats.LightRed, AnsiFormats.Bold],
	},
	levelNames: {
		[LogLevels.Debug]: "DEBUG",
		[LogLevels.Info]: " INFO",
		[LogLevels.Warn]: " WARN",
		[LogLevels.Error]: "ERROR",
		[LogLevels.Fatal]: "FATAL",
	},
	dateFormat: "%Y-%m-%d  %H:%M:%S"
}

class Logger {
	private cfg: Config = defaultConfig;
	constructor(config?: Partial<Config>) {
		Object.assign(this.cfg, config);
	}
	private log(level: LogLevels, line: string): void {
		if (level < this.cfg.level) return;
		const levelName = this.cfg.levelNames[level];
		const dateStr = (new JDate()).formatDate(this.cfg.dateFormat);
		const txt = `[${dateStr} | ${levelName}]: ${line}`;
		const ansiStart = buildAnsi(this.cfg.formats[level]);
		const formattedLine = ansiStart + txt + ansiReset;
		const out = (level === LogLevels.Error || level === LogLevels.Fatal) ? "stderr" : "stdout";
		process[out].write(formattedLine + "\r\n");
	}
	debug(line: string) {
		this.log(LogLevels.Debug, line);
	}
	info(line: string) {
		this.log(LogLevels.Info, line);
	}
	warn(line: string) {
		this.log(LogLevels.Warn, line);
	}
	error(data: string | Error) {
		const line = (typeof data === "string") ? data : (data.stack ?? data.message);
		this.log(LogLevels.Error, line);
	}
	fatal(data: string | Error) {
		const line = (typeof data === "string") ? data : (data.stack ?? data.message);
		this.log(LogLevels.Fatal, line);
	}
	clearFormats(): void {
		this.cfg.formats = {
			[LogLevels.Debug]: [],
			[LogLevels.Info]: [],
			[LogLevels.Warn]: [],
			[LogLevels.Error]: [],
			[LogLevels.Fatal]: [],
		}
	}
}

export { Logger, LogLevels, AnsiFormats }
