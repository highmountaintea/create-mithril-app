const m = require('mithril');

const model = require('./model');

function render() {
  return m('div', [
    m('h1', 'Hello World !!'),
    m('h3', 'Result: ' + JSON.stringify(model.getResult())),
  ]);
}

module.exports = render;
