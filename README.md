Customisable logger.

**Typescript example**
```ts
import { Logger } from "@james-bennett-295/logger";

const logger = new Logger(); // Create a logger with default settings

// Here logger.clearFormats() can be ran if ANSI colours are not supported.

logger.debug("message"); // Will not be shown due to default log level being info
logger.info("message");
logger.warn("message");
logger.error("message");
logger.fatal("message");

// The following will print the error stack
logger.error(new Error("message"));
logger.fatal(new Error("message"));
```
