import {createLogger, format, transports} from 'winston';

const {combine, timestamp, printf} = format;
const LOG_LEVEL = process.env.LOG_LEVEL || (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') ? 'error' : 'info';
const LOG_LEVEL_CONSOLE = process.env.LOG_LEVEL_CONSOLE || LOG_LEVEL;

const logger = createLogger({
  levels: {
    // RFC5424 syslog levels
    // https://tools.ietf.org/html/rfc5424
    emerg: 0, // system is unusable
    alert: 1, // action must be taken immediately
    crit: 2, // action must be taken immediately
    error: 3, // error conditions
    warn: 4, // warning conditions
    notice: 5, // normal but significant condition
    info: 6, // informational condition
    debug: 7, // debug condition

  },
  level: LOG_LEVEL,
  colorize: true,
  format: combine(
    format.colorize(),
    timestamp({
      format: 'YYYY-MM-DDTHH:mm:ss.SSSZZ'
    }),
    printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    // Use Winston as a console logger
    new transports.Console({
      level: LOG_LEVEL_CONSOLE,
      silent: process.env.NODE_ENV === 'production',
    })
  ]
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

export {logger};
