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
declare class Logger {
    private cfg;
    constructor(config?: Config);
    private log;
    debug(line: string): void;
    info(line: string): void;
    warn(line: string): void;
    error(data: string | Error): void;
    fatal(data: string | Error): void;
    clearFormats(): void;
}
export { Logger, LogLevels };
