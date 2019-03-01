const rewireDefinePlugin = require('react-app-rewire-define-plugin')

module.exports = function override(config, env) {
    config = rewireDefinePlugin(config, env, {
      'process.env.REACT_APP_MP_CHANNEL_SURF': JSON.stringify(process.env.REACT_APP_MP_CHANNEL_SURF),
      'process.env.REACT_APP_YT_KEY': JSON.stringify(process.env.REACT_APP_YT_KEY)
      })
    return config;
  }