import { formatDate } from '../../common/dateFormater';

export const ACTION_SET_DEPARTDATE = 'ACTION_SET_DEPARTDATE';
export const ACTION_SET_ARRIVEDATE = 'ACTION_SET_ARRIVEDATE';
export const ACTION_SET_DEPARTTIMESTR = 'ACTION_SET_DEPARTTIMESTR';
export const ACTION_SET_ARRIVETIMESTR = 'ACTION_SET_ARRIVETIMESTR';
export const ACTION_SET_DEPARTSTATION = 'ACTION_SET_DEPARTSTATION';
export const ACTION_SET_ARRIVESTATION = 'ACTION_SET_ARRIVESTATION';
export const ACTION_SET_TRAINNUMBER = 'ACTION_SET_TRAINNUMBER';
export const ACTION_SET_DURATIONSTR = 'ACTION_SET_DURATIONSTR';
export const ACTION_SET_TICKETS = 'ACTION_SET_TICKETS';
export const ACTION_SET_ISSCHEDULEVISIBLE = 'ACTION_SET_ISSCHEDULEVISIBLE';
export const ACTION_SET_SEARCHPARSED = 'ACTION_SET_SEARCHPARSED';

export function setDepartDate(departDate) {
  return {
    type: ACTION_SET_DEPARTDATE,
    value: departDate,
  };
}
export function setArriveDate(arriveDate) {
  return {
    type: ACTION_SET_ARRIVEDATE,
    value: arriveDate,
  };
}
export function setDepartTimeStr(departTimeStr) {
  return {
    type: ACTION_SET_DEPARTTIMESTR,
    value: departTimeStr,
  };
}
export function setArriveTimeStr(arriveTimeStr) {
  return {
    type: ACTION_SET_ARRIVETIMESTR,
    value: arriveTimeStr,
  };
}
export function setDepartStation(departStation) {
  return {
    type: ACTION_SET_DEPARTSTATION,
    value: departStation,
  };
}
export function setArriveStation(arriveStation) {
  return {
    type: ACTION_SET_ARRIVESTATION,
    value: arriveStation,
  };
}
export function setTrainNumber(trainNumber) {
  return {
    type: ACTION_SET_TRAINNUMBER,
    value: trainNumber,
  };
}
export function setDurationStr(durationStr) {
  return {
    type: ACTION_SET_DURATIONSTR,
    value: durationStr,
  };
}
export function setTickets(tickets) {
  return {
    type: ACTION_SET_TICKETS,
    value: tickets,
  };
}
export function setIsScheduleVisible(isScheduleVisible) {
  return {
    type: ACTION_SET_ISSCHEDULEVISIBLE,
    value: isScheduleVisible,
  };
}

export function toggleIsScheduleVisible() {
  return (dispatch, getState) => {
    const { isScheduleVisible } = getState();
    dispatch(setIsScheduleVisible(!isScheduleVisible));
  };
}

export function setSearchParsed(searchParsed) {
  return {
    type: ACTION_SET_SEARCHPARSED,
    value: searchParsed,
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
