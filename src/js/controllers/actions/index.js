const Initializer = require('../../event/Initializer');
const homeActions = require('./homeActions');

function init() {
  Initializer.init({ homeActions });
}

module.exports = { init };

