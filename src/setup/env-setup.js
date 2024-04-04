const dotenv = require('dotenv');

const EnvSetup = () => {
  dotenv.config({
    path: '.' + process.env.npm_lifecycle_event + '.env',
    encoding: 'UTF-8'
  });
};

module.exports = EnvSetup;