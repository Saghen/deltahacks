import websockets from 'uWebSockets.js'
import logger from '@logger'

const getUniqueID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  return s4() + s4() + '-' + s4()
}

let clients = {}
let heartbeatPeriod = false
let heartbeatsReceived = []

async function heartbeat() {
  setInterval(async function sendHeartbeat() {
    heartbeatPeriod = true
    logger.websockets.info('Sending global heartbeat')
    const heartbeatMsg = {
      type: 'HEARTBEAT',
      description: {},
    }
    const numClients = Object.keys(clients).length
    for (const client in clients) {
      const ws = clients[client]
      ws.send(JSON.stringify(heartbeatMsg))
    }
    setTimeout(() => {
      logger.websockets.info(
        'Received a heartbeat for ' + (heartbeatsReceived.length / numClients) * 100 + '% of the clients'
      )

      // Remove clients that missed the heartbeat
      const dupClients = clients
      const removedClients = []

      for (const client in clients) {
        if (!heartbeatsReceived.includes(client)) {
          // Didn't get a heartbeat
          dupClients[client].close()
          delete dupClients[client]
          removedClients.push(client)
        }
      }

      // Updated clients
      clients = dupClients

      // Debug statement
      removedClients.forEach((client) => {
        logger.websockets.debug('Removed client of ID' + client)
      })

      heartbeatPeriod = false
      heartbeatsReceived = []
    }, 1000 * 30) // 30 Seconds
  }, 1000 * 60 * 3) // 3 minutes
}

async function receiveHeartbeat(ws) {
  heartbeatsReceived.push(Object.keys(clients).find((connId) => clients[connId] === ws))
}

async function createWSServer() {
  logger.websockets.info('Creating server...')
  const server = websockets.App()

  const textDecoder = new TextDecoder('utf-8')
  server.ws('/', {
    open: (ws, req) => {
      const connId = getUniqueID()
      logger.websockets.info('A websocket connect via url: ' + req.getUrl() + ' -- Assigned ID: ' + connId)
      clients[connId] = ws
    },
    message: (ws, message, isBinary) => {
      const msg = textDecoder.decode(message)
      if (msg === 'HEARTBEAT' && heartbeatPeriod) {
        console.log(msg)
        receiveHeartbeat(ws)
      }
    },
    close: (ws, code, message) => {
      const clientKey = Object.keys(clients).filter((key) => clients[key] === ws)
      delete clients[clientKey[0]]
      logger.websockets.info('A websocket of ID' + clientKey[0] + 'has disconnected')
    },
  })

  logger.websockets.info('Server created, ready to listen')

  heartbeat()
  return server
}

export { createWSServer }
