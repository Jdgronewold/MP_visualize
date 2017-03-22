import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { bindAll, merge } from 'lodash';

import Header from './header';

const Root = ({store}) => {
    return (
      <Provider store={store} >
        <Header />
      </Provider>
    );
};

export default Root;
