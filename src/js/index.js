const routerInit = require('./router').init;
const controllerInit = require('./controllers').init;

(
  /**
   * @method app
   * @description Top level self executing initializer
   */
  function app() {
    controllerInit();
    routerInit();
  }()
);
