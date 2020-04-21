import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducer';
export default createStore(
  combineReducers(reducers),
  {
    from: 'Melbourne',
    to: 'Sydney',
    isCityPickerVisible: false,
    currentPickingLeftCity: false,
    cityData: null,
    isLoadingCityData: false,
    isDatePickerVisible: false,
    highSpeedPick: false,
    departDate: Date.now(),
  },
  applyMiddleware(thunk)
);
