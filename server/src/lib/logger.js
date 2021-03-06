import winston from 'winston'
import config from '@config'
import path from 'path'
import fs from 'fs'

import chalk from 'chalk'
import tripleBeam from 'triple-beam'

const { createLogger, format, transports } = winston
const { combine, colorize, label, simple, timestamp } = format

const loggerConfig = config.get('logger')

function addToBeginning(label, chalkFunc) {
  return format((info) => {
    info.level = `${chalkFunc(label)}: ${info.level}`
    return info
  })()
}

function json(replacer, space) {
  return format((info) => {
    info[tripleBeam.MESSAGE] = JSON.stringify(info, replacer, space) + ','
    return info
  })()
}

function createConsoleTransport(label, chalkFunc) {
  if (!loggerConfig.console.enabled) return
  const formatFuncs = [colorize(), simple()]
  if (label) {
    if (!chalkFunc) return console.error('Must provide chalk function when using a label')
    formatFuncs.splice(1, 0, addToBeginning(label, chalkFunc))
  }
  return new transports.Console({
    level: loggerConfig.console.level,
    format: combine(...formatFuncs),
    handleExceptions: loggerConfig.handleExceptions,
  })
}

// TODO: Split logs per week
function createFileTransport(labelText) {
  if (!loggerConfig.file.enabled) return

  const logDir = path.join(__dirname, '../../', loggerConfig.file.path)

  try {
    fs.mkdirSync(logDir)
  } catch (err) {}

  const formatFuncs = [json(undefined, config.get('env') !== 'production' ? 2 : 0), timestamp()]
  if (labelText) formatFuncs.unshift(label({ label: labelText }))

  return new transports.File({
    level: loggerConfig.file.level,
    format: combine(...formatFuncs),
    filename: path.join(logDir, loggerConfig.file.filename),
  })
}

const logger = createLogger({
  transports: [createConsoleTransport(), createFileTransport()].filter((a) => a),
})

logger.websockets = createLogger({
  transports: [createConsoleTransport('Websockets', chalk.blue), createFileTransport('Websockets')].filter((a) => a),
})

logger.api = createLogger({
  transports: [createConsoleTransport('API', chalk.magenta), createFileTransport('API')].filter((a) => a),
})

logger.db = createLogger({
  transports: [createConsoleTransport('DB', chalk.cyan), createFileTransport('DB')].filter((a) => a),
})

export default logger

export const waitForLogger = async (logger) => {
  const loggerDone = new Promise((resolve) => logger.on('finish', resolve))
  logger.close()
  return loggerDone
}
