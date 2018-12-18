/**
   * @method init
   * @description It is used to initialize all the controllers needed for the app
   * It goes through all the controllers in the hash and calls their respective init function
   */
function init(controllers) {
  // Iterating through the controllers hash
  Object.keys(controllers).map((key) => {
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
}
module.exports = { init };

