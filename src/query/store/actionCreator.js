import { ORDER_DEPART, ORDER_DURATION } from '../constant';
import { formatDate } from '../../common/dateFormater';
export const ACTION_SET_FROM = 'ACTION_SET_FROM';
export const ACTION_SET_TO = 'ACTION_SET_TO';
export const ACTION_SET_DEPART_DATE = 'ACTION_SET_DEPART_DATE';
export const ACTION_SET_HIGH_SPEED = 'ACTION_SET_HIGH_SPEED';
export const ACTION_SET_TRIP_LIST = 'ACTION_SET_TRIP_LIST';
export const ACTION_SET_ORDER_TYPES = 'ACTION_SET_ORDER_TYPES';
export const ACTION_SET_ONLY_TICKETS = 'ACTION_SET_ONLY_TICKETS';
export const ACTION_SET_TICKET_TYPES = 'ACTION_SET_TICKET_TYPES';
export const ACTION_SET_CHECKED_TICKET_TYPES =
  'ACTION_SET_CHECKED_TICKET_TYPES';
export const ACTION_SET_TRIP_TYPES = 'ACTION_SET_TRIP_TYPES';
export const ACTION_SET_CHECKED_TRIP_TYPES = 'ACTION_SET_CHECKED_TRIP_TYPES';
export const ACTION_SET_DEPART_STATIONS = 'ACTION_SET_DEPART_STATIONS';
export const ACTION_SET_CHECKED_DEPART_STATIONS =
  'ACTION_SET_CHECKED_DEPART_STATIONS';
export const ACTION_SET_ARRIVE_STATIONS = 'ACTION_SET_ARRIVE_STATIONS';
export const ACTION_SET_CHECKED_ARRIVE_STATIONS =
  'ACTION_SET_CHECKED_ARRIVE_STATIONS';
export const ACTION_SET_DEPART_TIME_START = 'ACTION_SET_DEPART_TIME_START';
export const ACTION_SET_DEPART_TIME_END = 'ACTION_SET_DEPART_TIME_END';
export const ACTION_SET_ARRIVE_TIME_START = 'ACTION_SET_ARRIVE_TIME_START';
export const ACTION_SET_ARRIVE_TIME_END = 'ACTION_SET_ARRIVE_TIME_END';
export const ACTION_SET_IS_FILTERS_VISIBLE = 'ACTION_SET_IS_FILTERS_VISIBLE';
export const ACTION_SET_SEARCH_PHARSED = 'ACTION_SET_SEARCH_PHARSED';

export function setFrom(from) {
  return {
    type: ACTION_SET_FROM,
    value: from
  };
}
export function setTo(to) {
  return {
    type: ACTION_SET_TO,
    value: to
  };
}
export function setDepartDate(departDate) {
  return {
    type: ACTION_SET_DEPART_DATE,
    value: departDate
  };
}
export function nextDate() {
  return (dispatch, getState) => {
    const { departDate } = getState();
    dispatch(setDepartDate(formatDate(departDate) + 86400 * 1000));
  };
}
export function prevDate() {
  return (dispatch, getState) => {
    const { departDate } = getState();
    dispatch(setDepartDate(formatDate(departDate) - 86400 * 1000));
  };
}
export function setHighSpeed(highSpeed) {
  return {
    type: ACTION_SET_HIGH_SPEED,
    value: highSpeed
  };
}
export function toggleHighSpeed() {
  return (dispatch, getState) => {
    const { highSpeed } = getState();
    dispatch(setHighSpeed(!highSpeed));
  };
}
export function setTripList(tripList) {
  return {
    type: ACTION_SET_TRIP_LIST,
    value: tripList
  };
}
export function toggleOrderTyps() {
  return (dispatch, getState) => {
    const { orderType } = getState();
    if (orderType === ORDER_DEPART) {
      dispatch({
        type: ACTION_SET_ORDER_TYPES,
        value: ORDER_DURATION
      });
    } else {
      dispatch({
        type: ACTION_SET_ORDER_TYPES,
        value: ORDER_DEPART
      });
    }
  };
}
export function toggleOnlyTickets() {
  return (dispatch, getState) => {
    const { onlyTickets } = getState();
    dispatch({
      type: ACTION_SET_ONLY_TICKETS,
      value: !onlyTickets
    });
  };
}
export function setTicketTypes(ticketTypes) {
  return {
    type: ACTION_SET_TICKET_TYPES,
    value: ticketTypes
  };
}
export function setCheckedTicketTypes(checkedTicketTypes) {
  return {
    type: ACTION_SET_CHECKED_TICKET_TYPES,
    value: checkedTicketTypes
  };
}
export function setTripTypes(tripTypes) {
  return {
    type: ACTION_SET_TRIP_TYPES,
    value: tripTypes
  };
}
export function setCheckedTripTypes(checkedTripTypes) {
  return {
    type: ACTION_SET_CHECKED_TRIP_TYPES,
    value: checkedTripTypes
  };
}
export function setDepartStations(departStations) {
  return {
    type: ACTION_SET_DEPART_STATIONS,
    value: departStations
  };
}
export function setCheckedDepartStations(checkedDepartStations) {
  return {
    type: ACTION_SET_CHECKED_DEPART_STATIONS,
    value: checkedDepartStations
  };
}
export function setArriveStations(arriveStations) {
  return {
    type: ACTION_SET_ARRIVE_STATIONS,
    value: arriveStations
  };
}
export function setCheckedArriveStations(checkedArriveStations) {
  return {
    type: ACTION_SET_CHECKED_ARRIVE_STATIONS,
    value: checkedArriveStations
  };
}
export function setDepartTimeStart(departTimeStart) {
  return {
    type: ACTION_SET_DEPART_TIME_START,
    value: departTimeStart
  };
}
export function setDepartTimeEnd(departTimeEnd) {
  return {
    type: ACTION_SET_DEPART_TIME_END,
    value: departTimeEnd
  };
}
export function setArriveTimeStart(arriveTimeStart) {
  return {
    type: ACTION_SET_ARRIVE_TIME_START,
    value: arriveTimeStart
  };
}
export function setArriveTimeEnd(arriveTimeEnd) {
  return {
    type: ACTION_SET_ARRIVE_TIME_END,
    value: arriveTimeEnd
  };
}
export function toggleIsFiltersVisible() {
  return (dispatch, getState) => {
    const { isFiltersVisible } = getState();
    dispatch({
      type: ACTION_SET_IS_FILTERS_VISIBLE,
      value: !isFiltersVisible
    });
  };
}
export function setSearchPharsed(searchPharsed) {
  return {
    type: ACTION_SET_SEARCH_PHARSED,
    value: searchPharsed
  };
}
