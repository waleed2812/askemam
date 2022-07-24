const winston = require("winston");
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.printf(function ({ timestamp, level, label, message, stack }) {
    const namespace = label ? `(${label})` : "";
    const errStack = stack ? `\n${stack}` : "";

    return `[${timestamp}] ${level}:${namespace} ${message} ${errStack}`;
  })
);
const path = process.env.NODE_ENV === "production" ? `logs/${new Date()}/` : `logs/`
const options = (winston.LoggerOptions = {
  format,
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === "production" ? "error" : "debug",
      format: winston.format.combine(winston.format.colorize(), format),
    }),
    new winston.transports.File({ filename: `${path}/info.log`, level: "info" }),
    new winston.transports.File({ filename: `${path}/error.log`, level: "error" }),
    new winston.transports.File({ filename: `${path}/debug.log`, level: "debug" }),
  ],
});

const logger = winston.createLogger(options);
module.exports = logger;
