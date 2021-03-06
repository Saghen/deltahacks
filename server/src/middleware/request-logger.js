import config from '@config'

import path from 'path'
import fs from 'fs'

import logger from '@logger'

import chalk from 'chalk'
import { performance } from 'perf_hooks'
import http from 'http'
import prettyBytes from 'pretty-bytes'

const loggerConfig = config.get('logger')
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../../', loggerConfig.file.path, loggerConfig.file.filename),
  { flags: 'a' }
)

const chalkColors = [chalk.red, chalk.green, chalk.yellow, chalk.blue, chalk.magenta, chalk.cyan]

export default function createRequestLogger(label, labelColorFunc) {
  return async (ctx, next) => {
    const hash = Math.round(Math.random() * Number.MAX_SAFE_INTEGER)
      .toString(16)
      .slice(0, 5)
    const hashColorFunc = chalkColors[Math.ceil(chalkColors.length * Math.random() - 1)]
    const requestStartTime = performance.now()

    // Request Logging
    const requestInfo = {
      isRequest: true,
      label,
      hash,
      hashColorFunc,
      method: ctx.method,
      url: ctx.request.url,
    }
    console.log(
      `${labelColorFunc(label)}: ${hashColorFunc(hash)} --> ${chalk.underline(ctx.method)} ${ctx.request.url}`
    )

    const errorInfo = {}
    try {
      await next()
    } catch (err) {
      // TODO: Use validation error instance of
      if (Array.isArray(err.failures)) {
        ctx.status = 400
        ctx.body = err.failures[0]
        errorInfo.message = ctx.body.message
      } else {
        ctx.status = err.statusCode || 500
        ctx.body = err.toJSON ? err.toJSON() : { message: err.message, ...err }
      }
      if (!config.get('api').stackTrace) {
        delete ctx.body.stack
      }

      errorInfo.stack = ctx.status >= 500 ? err.stack : undefined
      console.log(
        `${labelColorFunc(label)}: ${hashColorFunc(hash)} ${chalk.red(
          `!!! ${ctx.status} ${http.STATUS_CODES[ctx.status]}`
        )} Error in request\n${errorInfo.message}\n${err.stack}`
      )
    }

    // Response Logging
    const statusColorFunc = ctx.status >= 200 && ctx.status < 300 ? chalk.green : chalk.red
    const requestTime = Number((performance.now() - requestStartTime).toFixed(1))
    const responseInfo = {
      isResponse: true,
      label,
      hash,
      status: ctx.status,
      length: ctx.response.length || 0,
      type: ctx.response.type,
      requestTime,
      errorInfo,
    }
    console.log(
      `${labelColorFunc(label)}: ${hashColorFunc(hash)} <-- ${statusColorFunc(responseInfo.status)} ${statusColorFunc(
        http.STATUS_CODES[responseInfo.status]
      )} ${chalk.blue(prettyBytes(responseInfo.length))} ${chalk.blueBright(responseInfo.type)} ${chalk.gray(
        `(<->) ${requestTime} ms`
      )}`
    )

    if (responseInfo.status >= 500) {
      writeObjectToFile(requestInfo)
      writeObjectToFile(responseInfo)
    }
  }
}

function writeObjectToFile(obj) {
  accessLogStream.write(
    JSON.stringify(obj, undefined, config.get('env') !== 'production' ? 2 : 0) + ',\n',
    (err) => err && (logger.error(`Error while writing logs to file`) || logger.error(err.message))
  )
}
