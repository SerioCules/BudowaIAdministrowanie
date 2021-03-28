const winston = require('winston')
const config = require('config')

const formatter = winston.format.printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}][${label}] ${level}: ${message}`
})

function Logger (loggerConf) {
  const logger = winston.createLogger({
    level: loggerConf.level,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      formatter
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: loggerConf.filename })
    ]
  })

  return logger
}

const loggerConf = config.get('feedmail.logger')
const logger = Logger(loggerConf)

module.exports = logger