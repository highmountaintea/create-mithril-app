import m from 'mithril';

import * as model from './model';

export function MainView() {
  return m('div', [
    m('h1', 'Hello World !!'),
    m('h3', 'Result: ' + JSON.stringify(model.getResult())),
  ]);
}
