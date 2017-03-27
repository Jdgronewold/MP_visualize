import { combineReducers } from 'redux';
import LoadingReducer from './loading_reducer';
import TicksReducer from './ticks_reducer';
import RoutesReducer from './routes_reducer';

export default combineReducers({
  loading: LoadingReducer,
  ticks: TicksReducer
});
