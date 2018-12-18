const EventDispatcher = require('../../../event/Dispatcher');
const ApiService = require('../../../services/APIService');

function callApi() {
  ApiService.initApi((err, data) => {
    if (err) { console.log('Error occurred', err); } else {  //eslint-disable-line
      console.log('Success', data); //eslint-disable-line
    }
  });
}

function init() {
  EventDispatcher.on('action:fetchInitialData', callApi);
}

module.exports = { init };
