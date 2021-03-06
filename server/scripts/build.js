const { debounce } = require('lodash')
const { performance } = require('perf_hooks')

const chokidar = require('chokidar')
const { build } = require('esbuild')

const chalk = require('chalk')
const log = require('./logger').createLogger({ prefix: 'Server', color: chalk.blue })

const fs = require('fs')
const path = require('path')

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development'

function runBuild({ strict } = {}) {
  const startTime = performance.now()
  return build({
    entryPoints: ['src/main.js'],
    outfile: 'build/main.js',
    define: {
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    },
    bundle: true,
    minify: process.env.NODE_ENV === 'production',
    sourcemap: process.env.NODE_ENV === 'development' && 'external',
    logLevel: 'error',
    platform: 'node',
    target: 'node15.11',
    external: Object.keys(JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'))).dependencies)
  })
    .then(() => log('Build Time', chalk.green(`${(performance.now() - startTime).toFixed(2)}ms`)))
    .catch((err) => {
      log(chalk.red('Build failed'))
      log(chalk.red(err.stack))
      if (strict) process.exit(1)
    })
}

async function handleWatcher() {
  if (process.env.NODE_ENV === 'production') return runBuild({ strict: true })

  log('Development watcher opened')
  await runBuild()

  const debouncedBuild = debounce(runBuild, 100)

  chokidar.watch(['src', 'public'], { recursive: true }).on('change', (filename) => {
    log('File changed', filename)
    log('Rebuilding...')
    debouncedBuild()
  })
}

handleWatcher()
