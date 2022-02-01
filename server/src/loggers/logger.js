import { createLogger, transports,format } from "winston";
import path from "path";

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({
    filename: './logs/mylogs.log',
    level: "info",
    }),
  ],
});

export default logger;
