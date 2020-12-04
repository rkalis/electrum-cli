#! /usr/bin/env node
const { program } = require('commander')
const { ElectrumClient } = require('electrum-cash')
const { ensure, parseValue } = require('./util')

const sendRequest = async (method, methodArgs, program) => {
  const opts = program.opts()

  methodArgs = methodArgs.map(parseValue)

  ensure(!(opts.btc && opts.bch), 'Cannot use --btc and --bch flags in the same request')

  const server = opts.server || (opts.bch && 'bch.imaginary.cash:50002') || (opts.btc && 'electrumx-core.1209k.com:50002')

  ensure(server, 'Please provide the Electrum server you would like to connect to')

  const [host, port] = server.split(':')
  ensure(host && port, 'Please provide the server in the format {host}:{port}')

  const electrum = new ElectrumClient('electrum-cli', opts.version, host, port)

  await electrum.connect().catch(() => {
    abort(`Could not connect to ${server}`)
  })

  const response = await electrum.request(method, ...methodArgs)

  if (response instanceof Error) {
    console.error(response.message)
  } else if (typeof response === 'object') {
    console.log(JSON.stringify(response, null, 2))
  } else {
    console.log(response)
  }

  electrum.disconnect()
  process.exit()
}

program
  .storeOptionsAsProperties(false)
  .name('electrum-cli')
  .arguments('<method> [methodArgs...]')
  .option('--server <server>', 'electrum server to connect to over SSL ({host}:{port})')
  .option('--version <version>', 'electrum protocol version to use', '1.4')
  .option('--btc', 'use default server for BTC (electrumx-core.1209k.com:50002)')
  .option('--bch', 'use default server for BCH (bch.imaginary.cash:50002)')
  .helpOption('--help')
  .action(sendRequest)
  .parse()
