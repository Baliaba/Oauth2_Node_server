/*******
* config.js file
*******/

require('dotenv').config()
const PARAMS =  {
  ISSUER,
  CLIENT_ID,
  CLIENT_SECRET,
  DEFAULT_SCOPE,
  PREFIX,
  PORT,
  DEFAULT_PORT
} = process.env;

const _ = require('lodash');
const env = process.env.NODE_ENV || 'local';
const envConfig = require('./' + env);
let defaultConfig = {
  env: env,
  ifd_env : PARAMS
};
module.exports = _.merge(defaultConfig,envConfig);