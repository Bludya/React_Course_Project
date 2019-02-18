const path = require('path');

module.exports = {
    tokenSecret: 'supersecretensecret',
    development: {
      port: 9999,
      dbPath: 'mongodb://root:root123@ds139435.mlab.com:39435/react_project'
    },
    production: {}
};
