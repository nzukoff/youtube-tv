const { appendWebpackPlugin } = require("@rescripts/utilities");
const { DefinePlugin } = require("webpack");
require("dotenv").config();

const { REACT_APP_MP_CHANNEL_SURF, REACT_APP_YT_KEY } = process.env;

module.exports = config =>
  appendWebpackPlugin(
    new DefinePlugin({
      "process.env.REACT_APP_MP_CHANNEL_SURF": JSON.stringify(REACT_APP_MP_CHANNEL_SURF),
      "process.env.REACT_APP_YT_KEY": JSON.stringify(REACT_APP_YT_KEY),
    }),
    config
  );
