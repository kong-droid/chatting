import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import EnvSetup from "./env-setup.js";

EnvSetup();

const transport = new winstonDaily({
  datePattern: 'YYYY-MM-DD',
  dirname: process.env.NODE_ENV_LOG_FILE_DIR,
  filename: `belogger-tcp_%DATE%.log`,
  maxFiles: 100,         // after 100 day delete..
  zippedArchive: false,  // zipping log files
});

const {combine, timestamp, printf} = winston.format;

const logFormat = printf(f => {
  return `${f.timestamp} ${f.level}: ${f.message}`;
});

const Logging = winston.createLogger({
  level: process.env.NODE_ENV_LOG_LEVEL_MESSAGE,
  format: combine(
      timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      logFormat
  ),
  transports: [
    transport
  ]
});

if(process.env.npm_lifecycle_event === 'local') {
  Logging.add(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
    )
  }));
}

export default Logging;