const readline = require('readline-sync')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

let configs = fs.readdirSync(path.join(__dirname, '../public/configs'))

// Trim extension
configs = configs.map((val) => val.split('.').slice(0, -1).join('.'))

// Remove node and file location from arguments
const args = process.argv.slice(2)

if (args.length > 0) {
  exitIfConfigsDontExist(args)

  storeConfigs(args)
  process.exit(0)
}

let activeConfigs = []
// Display active configs
try {
  activeConfigs = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/active-configs.json')).toString())
  console.log(`${chalk.bold.blue('Active configs: ')}${activeConfigs.join(', ')}`)
} catch (err) {
  console.log(`${chalk.bold.red('An error occured while getting the active configs')}${activeConfigs.join(', ')}`)
  process.exit(1)
}

// If configs aren't provided in the args, ask the user
for (let [index, value] of configs.entries()) {
  let selector = chalk.bold.blue(`[${index + 1}]`)
  console.log(`${selector} ${value}`)
}

const ans = readline.question('Provide a comma separated list of the configs you would like to select \n')

const selectedConfigs = ans.split(',').map((val) => val.trim()).filter(Boolean)
if (selectedConfigs.length === 1 && selectedConfigs[0] === '') selectedConfigs.shift()
exitIfConfigsDontExist(selectedConfigs)
storeConfigs(selectedConfigs)

// Util Funcs
function storeConfigs(selectedConfigs) {
  if (!Array.isArray(selectedConfigs)) throw new Error('Selected array must be an array')

  fs.writeFileSync(path.join(__dirname, '../public/active-configs.json'), JSON.stringify(selectedConfigs))
  console.log(chalk.bold.blue('Successfully stored new configuration'))
  console.log(selectedConfigs)
}

function exitIfConfigsDontExist(selectedConfigs) {
  for (let config of selectedConfigs) {
    if (!configs.includes(config)) {
      console.error(`"${config}" was not found in the configs folder`)
      process.exit(1)
    }
  }
}
