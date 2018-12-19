const assert = require('assert')
const program = require('commander')

const pkg = require('./package.json')
const Robot = require('./lib/robot')
const subCommands = require('./lib/subCommands')

const list = val => {
  return val ? val.split(',') : []
}

program
  .version(pkg.version)
  .option('-t, --token [access token]', 'Dingtalk robot accessToken or set env.DT_ROBOT_TOKEN')
  .option('-q --quiet', 'will not exit with 1 when fail', false)
  .option('--at [mobiles]', 'At somebody, limited using', list)
  .option('--isAtAll', 'If is atall, limited using', false)

subCommands.forEach(({ command, options = [], description }) => {
  let p = program.command(command).description(`${description}, use <cmd> -h to read help info`)
  options.map(option => {
    p = p.option.apply(p, option)
  })
  p.action((...args) => {
    let token
    const arg = args[0]
    let opt = args[1]
    let others

    if (args.length > 2) {
      others = args[1]
      opt = args[2]
    }

    if (!(token = process.env.DT_ROBOT_TOKEN || opt.parent.token)) {
      console.error(' ')
      console.error('No access token given!')
      console.error(' ')
      process.exit(opt.parent.quiet ? 0 : 1)
    }

    const robot = new Robot({
      token,
      at: opt.parent.at,
      isAtAll: opt.parent.isAtAll,
      quiet: opt.parent.quiet
    })

    robot[opt._name](arg, opt, others)
  })
})

program.parse(process.argv)
