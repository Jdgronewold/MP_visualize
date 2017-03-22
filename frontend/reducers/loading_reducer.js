import { merge } from 'lodash';

import {
  START_LOADING_TICKS,
  TICKS_LOADED,
  RECEIVE_ROUTES
} from '../actions/mp_actions';

const initialLoad = {
  ticksLoading: false,
  routesLoading: false
};

export default (state = initialLoad, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ROUTES:
      return initialLoad;
    case START_LOADING_TICKS:
      return {ticksLoading: true, routesLoading: true};
    case TICKS_LOADED:
      return {ticksLoading: false, routesLoading: true};
    default:
      return state;
  }
};
