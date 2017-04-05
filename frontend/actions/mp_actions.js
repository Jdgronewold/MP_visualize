import * as MPUtils from '../utils/mp_utils';

export const RECEIVE_TICKS = 'RECEIVE_TICKS';
export const RECEIVE_ROUTES = 'RECEIVE_ROUTES';
export const START_LOADING_TICKS = 'START_LOADING_TICKS';
export const START_LOADING_ROUTES = 'START_LOADING_ROUTES';
export const TICKS_LOADED = 'TICKS_LOADED';
export const RESET_ERROR = 'RESET_ERROR';


//SYNC
export const receiveTicks = (ticks) => ({
  type: RECEIVE_TICKS,
  ticks
});

export const receiveRoutes = (routes) => ({
  type: RECEIVE_ROUTES,
  routes
});

export const startLoadingTicks = () => ({
  type: START_LOADING_TICKS
});

export const ticksLoaded = () => ({
  type: TICKS_LOADED
});

export const resetError = () => ({
  type: RESET_ERROR
});

//ASYNC
//startLoadingTicks is for the waiting process
export const fetchTicks = (input, type) => (dispatch) => {
  dispatch(startLoadingTicks());
  return MPUtils.getTicks(input, type)
  .then(allTicks => {
    dispatch(receiveTicks(allTicks));
    return allTicks.ticks;
  }, error => {
    alert('The provided email or userId did not match any MP accounts');
    dispatch(resetError());
  });
};

export const fetchRoutes = (routes) => dispatch => {
  return MPUtils.getRoutes(routes)
  .then(routes => dispatch(receiveRoutes(routes)));
};
