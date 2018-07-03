'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ONE_SIGNAL_KEY: '"71ea0c78-e93b-4c6e-9305-803514b64482"'
})
