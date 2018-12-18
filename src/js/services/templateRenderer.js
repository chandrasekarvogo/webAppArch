/**
 * this method render the htmlString in given Element
 * Default: innerContainer
*/

function render(htmlString, id) {
  const container = document.getElementById(id || 'innerContainer');
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }
  container.innerHTML = htmlString;
}

module.exports = {
  render,
};
