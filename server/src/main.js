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
}

initServer()
