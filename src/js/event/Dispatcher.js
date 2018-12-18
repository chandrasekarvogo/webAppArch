/**
 * EventDispatcher
 * This object is the key for the custom event dispatch implemented.
 *
 * @property {Object} events List of hash map of events
 * @property {Function} on Function to attach listener
 * @property {Function} trigger Function to dispatch action/event
 */
const EventDispatcher = {

  /**
     * @property {Object} events
     * The hashmap to hold the events versus the callback functions array
     * example:
     *  {
     *    blah: [callback1, callback2]
     *  }
     */
  events: {},

  /**
     * @property {Function} on It creates the map for the eventname and the callback functions
     * @param {String} eventName The event name on which the listener needs to be attached
     * @param {Function} callback The function to be called for the event trigger
     */
  on(eventName, callback) {
    // Ignore if the callback is not a function. No use with that.
    if (typeof callback !== 'function') {
      return;
    }

    // get any handleres attached if already, defaults to empty array if not.
    const handlers = this.events[eventName] || [];

    // Push the callback function into the handlers list
    handlers[0] = callback;

    // Assign back the handlers array to the event over the event name
    this.events[eventName] = handlers;
  },

  /**
     * @property {Function} trigger All callbacks will be for a particular event name
     * @param {String} eventName The event name to be triggered
     * @param {*} data The data to be passed to the function attached to the event
     */
  trigger(eventName, data) {
    // Get the handlers for the particular event
    const handlers = this.events[eventName];

    // If no handlers available, then just ignore it.
    if (!handlers || handlers.length < 1) { return; }

    // If we finds the handlers, then go ahead and call them with the data
    [].forEach.call(handlers, (handler) => {
      // Call the handler if it is only a function
      if (typeof handler === 'function') {
        handler(data);
      }
    });
  },
};

module.exports = EventDispatcher;

