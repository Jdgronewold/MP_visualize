import * as MPUtils from '../utils/mp_utils';

export const RECEIVE_TICKS = 'RECEIVE_TICKS';
export const RECEIVE_ROUTES = 'RECEIVE_ROUTES';
export const START_LOADING_TICKS = 'START_LOADING_TICKS';
export const START_LOADING_ROUTES = 'START_LOADING_ROUTES';
export const TICKS_LOADED = 'TICKS_LOADED';


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

//ASYNC
export const fetchTicks = (email) => (dispatch) => {
  dispatch(startLoadingTicks());
  return MPUtils.getTicks(email)
    .then(allTicks => {
    dispatch(receiveTicks(allTicks));
    return allTicks.ticks;
    })
    .then(ticks => {
      var ids = [];
      ticks.each(tick => {
        ids.push(tick.routeId);
      });
      dispatch(fetchRoutes(ids));
    });
};

export const fetchRoutes = (routes) => dispatch => {
  dispatch(ticksLoaded);
  return MPUtils.getRoutes(routes)
  .then(routes => dispatch(receiveRoutes(routes)));
};
