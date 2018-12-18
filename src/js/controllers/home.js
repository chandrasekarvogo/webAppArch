const EventDispatcher = require('../event/Dispatcher');
const templateRenderer = require('../services/templateRenderer');
const homeTemplate = require('../views/home.hbs');

function home() {
  const options = {
    appName: 'Sample WebApp Arch',
    userName: '',
  };
  const homePage = homeTemplate(options);
  templateRenderer.render(homePage);
}

/**
 * @method init
 * @description Initializer function for the controller
 */
function init() {
  EventDispatcher.on('route:home', home);
}


module.exports = {
  init,
};
