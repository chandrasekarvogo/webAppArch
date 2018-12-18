const EventDispatcher = require('./event/Dispatcher');

/**
 * @method clearSlashes
 * @description It is to replaces the slashes in the string
 * @param {String} path
 * @returns {String}
 */
function clearSlashes(path) {
  return path.toString().replace(/\/$/, '').replace(/^\//, '');
}

/**
 * @method getFragment
 * @description It is used to get the path the app currently in and get the fragments
 * @returns {String}
 * if window.location is http://root/#/foo
 * this return `foo`
 */
function getFragment() {
  let fragment = '';
  const match = window.location.href.match(/#(.*)$/);
  fragment = match ? match[1] : '';
  return clearSlashes(fragment);
}

/**
 * @method handleOnHashChange
 * @description The handling for URL hash change will be here
 * It strips out the URL and dispatch the appropriate event
 *
 * @fires Event#route
 */
function handleOnHashChange() {
  const fragment = getFragment();
  EventDispatcher.trigger(`route:${fragment}`, {
    path: fragment,
  });
}

/**
 * @method init
 * @description Top level initialize function for the router
 *
 * @listens window#onhashchange
 */
function init() {
  window.onhashchange = handleOnHashChange;
  handleOnHashChange();
}

module.exports = {
  init,
};
