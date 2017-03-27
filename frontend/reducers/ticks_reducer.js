import { merge } from 'lodash';

import { RECEIVE_TICKS } from '../actions/mp_actions';

const defaultTicks = [];

export default (state = defaultTicks, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_TICKS:
      return merge([], action.ticks);
    default:
      return state;
  }
};
