import webpack from 'webpack'
const rewireDefinePlugin = require('react-app-rewire-define-plugin')

module.exports = function override(config, env) {
    config = rewireDefinePlugin(config, env, {
        REACT_APP_MP_CHANNEL_SURF: JSON.stringify(process.env.ENVVARIABLENAME)
      })
    return config;
  }