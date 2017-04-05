import { merge } from 'lodash';

import {
  START_LOADING_TICKS,
  TICKS_LOADED,
  RECEIVE_TICKS,
  RESET_ERROR
} from '../actions/mp_actions';

const initialLoad = {
  userSearched: false,
  ticksLoading: false,
  routesLoading: false
};

export default (state = initialLoad, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_TICKS:
      return {userSearched: true, ticksLoading: false, routesLoading: false};
    case START_LOADING_TICKS:
      return {userSearched: false, ticksLoading: true, routesLoading: true};
    case TICKS_LOADED:
      return {userSearched: true, ticksLoading: false, routesLoading: true};
    case RESET_ERROR:
      return {userSearched: false, ticksLoading: false, routesLoading: false};
    default:
      return state;
  }
};
