const EventDispatcher = require('../event/Dispatcher');
const context = require('./context');
const raven = require('./raven');
const action = require('./actions');
const home = require('./home');

// Controllers hash
const controllers = {
  raven,
  context,
  action,
  home,
};

  /**
   * @method init
   * @description It is used to initialize all the controllers needed for the app
   * It goes through all the controllers in the hash and calls their respective init function
   */
function init() {
  // Iterating through the controllers hash
  window.controllers = Object.keys(controllers).map((key) => {
    // Print error in console if any controller doesn't have init function
    if (typeof controllers[key].init !== 'function') {
      console.error(        //eslint-disable-line
        'InvalidController: Controller with no initialize function',
        key,
      );
      return null;
    }
    // Call the init function
    return controllers[key].init();
  });

  /**
   * Registering global function to trigger Events
   */
  window.dynamicEventDispatcher = function dynamicEventDispatcher(
    eventName,
    arg,
  ) {
    EventDispatcher.trigger(eventName, arg);
  };
}

module.exports = {
  init,
};

