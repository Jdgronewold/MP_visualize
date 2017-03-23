import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { bindAll, merge } from 'lodash';

import App from './app';

const Root = ({store}) => {
    return (
      <Provider store={store} >
        <App />
      </Provider>
    );
};

export default Root;
