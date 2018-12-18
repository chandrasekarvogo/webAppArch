function init() {
  window.vogo = {};
  window.vogo.constants = {};
  window.vogo.constants.URL_PREFIX = urlPrefix; //eslint-disable-line
  window.vogo.constants.STATIC_URL_PREFIX = staticUrlPrefix; //eslint-disable-line

  window.addEventListener('offline', () => {
    console.log('No internet Connection');  //eslint-disable-line
  });
}

module.exports = {
  init,
};
