const { escapeRegExp, debounce } = require('lodash')
const { performance } = require('perf_hooks')

const chokidar = require('chokidar')
const { build } = require('esbuild')
const { promises: fs } = require('fs')
const path = require('path')

const chalk = require('chalk')
const log = require('./logger').createLogger({
  prefix: 'Client',
  color: chalk.magenta,
})

async function copyPublic() {
  const publicDir = path.join(__dirname, '../public/')
  const buildDir = path.join(__dirname, '../build/')

  await fs.mkdir(buildDir, { recursive: true })

  const files = await fs.readdir(publicDir)
  const copyOps = []
  for (const file of files) copyOps.push(fs.copyFile(path.join(publicDir, file), path.join(buildDir, file)))

  return Promise.all(copyOps)
}

function alias(options) {
  const aliases = Object.keys(options)
  const re = new RegExp(`^${aliases.map(escapeRegExp).join('|')}$`)

  return {
    name: 'alias',
    setup(build) {
      // we do not register 'file' namespace here, because the root file won't be processed
      // https://github.com/evanw/esbuild/issues/791
      build.onResolve({ filter: re }, (args) => ({
        path: require.resolve(options[args.path] || args.path),
      }))
    },
  }
}

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development'

async function runBuild({ strict } = {}) {
  const startTime = performance.now()
  await copyPublic()
  return build({
    entryPoints: ['src/main.js'],
    bundle: true,
    outfile: 'build/content.js',
    loader: {
      '.js': 'jsx',
      '.ts': 'tsx',
    },
    plugins: [
      alias({
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      }),
    ],
    define: {
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    },
    minify: process.env.NODE_ENV === 'production',
    sourcemap: process.env.NODE_ENV === 'development' && 'external',
    inject: ['./scripts/preact-shim.js'],
    logLevel: 'error',
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
