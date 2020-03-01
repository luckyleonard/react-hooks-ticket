import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import reducers from './reducer';

import dateFormater from '../../common/dateFormater';
import { ORDER_DEPART } from '../constant';

export default createStore(
  combineReducers(reducers),
  {
    from: null,
    to: null,
    departDate: dateFormater(Date.now()),
    highSpeed: false,
    tripList: [],
    orderTyps: ORDER_DEPART,
    onlyTickets: false,
    ticketTypes: [],
    checkedTicketTypes: {},
    tripTypes: [],
    checkedTripTypes: {},
    departStations: [],
    checkedDepartStations: {},
    arriveStations: [],
    checkedArriveStations: {},
    departTimeStart: 0,
    departTimeEnd: 24,
    arriveTimeStart: 0,
    arriveTimeEnd: 24,
    isFiltersVisible: false,
    searchPharsed: false
  },
  applyMiddleware(thunk)
);
