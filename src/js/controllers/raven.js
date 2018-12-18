function init() {
  Raven.config('https://1bd9767603a24115b305c4597def405c@sentry.io/1232526').install();  // eslint-disable-line
}

module.exports = { init };
