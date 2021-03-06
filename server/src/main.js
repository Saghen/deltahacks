import config from '@config'

import mongo from '@db/connect'

import logger, { waitForLogger } from '@logger'

async function initServer() {
  await mongo()

  const { createAPIServer } = await import('@lib/api-server').catch(async (err) => {
    if (err instanceof SyntaxError) throw err
    logger.api.error(err.message)
    logger.api.error(err.stack)
    await waitForLogger(logger.api)
    process.exit(1)
  })
  const { createWSServer } = await import('@lib/ws-server').catch(async (err) => {
    if (err instanceof SyntaxError) throw err
    logger.websockets.error(err.message)
    logger.websockets.error(err.stack)
    await waitForLogger(logger.websockets)
    process.exit(1)
  })

  createAPIServer()
    .then((app) =>
      app.listen(config.get('api.port'), () => {
        logger.api.info(`Listening on ${config.get('api.port')} in ${config.get('env')} mode`)
      })
    )
    .catch(async (err) => {
      logger.api.error('Error while starting up the server')
      logger.api.error(err.stack)
      await waitForLogger(logger.api)
      process.exit(1)
    })

  createWSServer().then((app) =>
    app.listen(config.get('websockets.port'), async (token) => {
      if (token)
        return logger.websockets.info(`Listening on ${config.get('websockets.port')} in ${config.get('env')} mode`)
      logger.websockets.error('Error while starting up the Websocket server')
      logger.websockets.error(`Likely failed to listen on port ${config.get('websockets.port')}`)
      await waitForLogger(logger.websockets)
      process.exit(1)
    })
  )
}

initServer()
