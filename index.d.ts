interface LoggerConfig {
	debugEnabled?: boolean,
	logsDir?: string | null,
	useAnsiColours?: boolean
}

declare module "@james-bennett-295/logger" {
	export function info(
		logLine: string
	): void;
	export function warn(
		logLine: string
	): void;
	export function error(
		logLine: string,
		error?: Error
	): void;
	export function fatal(
		logLine: string
	): void;
	export function debug(
		logLine: string
	): void;
	export function config(
		cfg: LoggerConfig
	): void;
}
