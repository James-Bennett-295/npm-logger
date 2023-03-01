import AnsiFormats from "./AnsiFormats";
declare enum LogLevels {
    Debug = 0,
    Info = 1,
    Warn = 2,
    Error = 3,
    Fatal = 4
}
declare type Config = {
    level: LogLevels;
    formats: {
        [key: number]: Array<AnsiFormats>;
    };
    levelNames: {
        [key: number]: string;
    };
    dateFormat: string;
};
declare type Log = {
    level: LogLevels;
    line: string;
    formattedLine: string;
};
declare class Logger {
    private cfg;
    onLog: ((log: Log) => void) | null;
    constructor(config?: Partial<Config>);
    private log;
    debug(line: string): void;
    info(line: string): void;
    warn(line: string): void;
    warnNoEvent(line: string): void;
    error(data: string | Error): void;
    errorNoEvent(data: string | Error): void;
    fatal(data: string | Error): void;
    clearFormats(): void;
}
export { Logger, LogLevels, AnsiFormats, Log };
