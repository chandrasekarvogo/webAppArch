const Initializer = require('../../../event/Initializer');
const homeInit = require('./homeInit');


function init() {
  const controllers = {
    homeInit,
  };

  Initializer.init(controllers);
}

module.exports = { init };
