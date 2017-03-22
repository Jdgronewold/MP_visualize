import React from 'react';
import ReactDom from 'react-dom';
import configureStore from './store/store.js';

import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  debugger
  const root = document.getElementById("root");
  const store = configureStore();
  ReactDom.render(<Root store={store} />, root);
});
