import { merge } from 'lodash';

import { RECEIVE_ROUTES } from '../actions/mp_actions';

const defaultRoutes = {
  routes: []
};

export default (state = defaultRoutes, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ROUTES:
      return merge({}, action.routes);
    default:
      return state;
  }
};
