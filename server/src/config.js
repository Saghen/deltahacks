import convict from 'convict'
import path from 'path'
import fs from 'fs'

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  ssl: {
    doc: 'Toggle to enable/disable HTTPS encryption',
    type: Boolean,
    default: false,
  },
  websockets: {
    domain: {
      doc: 'The domain that the websocket server is hosted on <-- not the port of the node server',
      type: String,
      default: 'localhost:8080',
    },
    port: {
      doc: 'The port for the websocket server to listen on',
      type: Number,
      default: 8080,
    },
  },
  api: {
    domain: {
      doc: 'The domain that the API server is hosted on <-- not the port of the node server',
      type: String,
      default: 'localhost',
    },
    port: {
      doc: 'The port for the websocket server to listen on',
      type: Number,
      default: 8081,
    },
    stackTrace: {
      doc: 'Emit a stack trace to the browser when an error is thrown on a request',
      format: Boolean,
      default: false,
    },
  },
  client: {
    domain: {
      doc:
        'The domain that the node or nginx server is hosted on <-- not the port of the node server. Include http:// as this is use for CORS.',
      type: String,
      default: 'http://localhost:8082',
    },
  },
  mongo: {
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: 'localhost',
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'deltahacks',
    },
    port: {
      doc: 'Database port',
      format: Number,
      default: 27017,
    },
    auth: {
      enabled: {
        doc: 'Whether to use authentication when connecting to the DB',
        format: Boolean,
        default: false,
      },
      username: {
        doc: 'Username for database authentication',
        format: String,
        default: 'admin',
      },
      password: {
        doc: 'Password for database authentication',
        format: String,
        default: 'admin',
      },
    },
    options: {
      doc: 'Options for the URI',
      format: Object,
      default: {},
    },
  },
  logger: {
    handleExceptions: {
      doc: 'Enable the handling of exceptions',
      format: Boolean,
      default: false,
    },
    console: {
      enabled: {
        doc: 'Whether console logging is enabled or not',
        format: Boolean,
        default: true,
      },
      level: {
        doc: 'Log only if level less than or equal to this level',
        format: ['error', 'warn', 'info', 'verbose', 'debug', 'silly'],
        default: 'debug',
      },
    },
    file: {
      enabled: {
        doc: 'Whether file logging is enabled or not',
        format: Boolean,
        default: true,
      },
      level: {
        doc: 'Log only if level less than or equal to this level',
        format: ['error', 'warn', 'info', 'verbose', 'debug', 'silly'],
        default: 'debug',
      },
      path: {
        doc: 'Relative path from the root of the server folder to the log folder',
        format: String,
        default: 'log',
      },
      filename: {
        doc: 'Name of log file including extension',
        format: String,
        default: 'server.log',
      },
    },
  },
  auth: {
    enabled: {
      doc: 'Toggle for enabling or disabling authentication for testing/development',
      format: Boolean,
      default: true,
    },
    cookie: {
      doc: 'Name of the cookie',
      format: String,
      default: 'token',
    },
    privateKey: {
      doc: 'Private key for PASETO signing and verification stored in pkcs8',
      format: String,
      default: '',
    },
    publicKey: {
      doc: 'Public key for PASETO decoding stored in spki',
      format: String,
      default: '',
    },
  },
})

const activeConfigs = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/active-configs.json')))

for (const configName of activeConfigs) {
  config.loadFile(path.join(__dirname, `../public/configs/${configName}.json`))
}

config.validate({ allowed: 'strict' })

export default config
