export const ACTION_SET_TRAINNUMBER = 'ACTION_SET_TRAINNUMBER';
export const ACTION_SET_DEPARTSTATION = 'ACTION_SET_DEPARTSTATION';
export const ACTION_SET_ARRIVESTATION = 'ACTION_SET_ARRIVESTATION';
export const ACTION_SET_SEATTYPE = 'ACTION_SET_SEATTYPE';
export const ACTION_SET_DEPARTDATE = 'ACTION_SET_DEPARTDATE';
export const ACTION_SET_ARRIVEDATE = 'ACTION_SET_ARRIVEDATE';
export const ACTION_SET_DEPARTTIMESTR = 'ACTION_SET_DEPARTTIMESTR';
export const ACTION_SET_ARRIVETIMESTR = 'ACTION_SET_ARRIVETIMESTR';
export const ACTION_SET_DURATIONSTR = 'ACTION_SET_DURATIONSTR';
export const ACTION_SET_PRICE = 'ACTION_SET_PRICE';
export const ACTION_SET_PASSENGERS = 'ACTION_SET_PASSENGERS';
export const ACTION_SET_MENU = 'ACTION_SET_MENU';
export const ACTION_SET_ISMENUVISIBLE = 'ACTION_SET_ISMENUVISIBLE';
export const ACTION_SET_SEARCHPARSED = 'ACTION_SET_SEARCHPARSED';

export function setTrainNumber(trainNumber) {
  return {
    type: ACTION_SET_TRAINNUMBER,
    value: trainNumber,
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
export function setSeatType(seatType) {
  return {
    type: ACTION_SET_SEATTYPE,
    value: seatType,
  };
}
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
export function setDurationStr(durationStr) {
  return {
    type: ACTION_SET_DURATIONSTR,
    value: durationStr,
  };
}
export function setPrice(price) {
  return {
    type: ACTION_SET_PRICE,
    value: price,
  };
}
export function setPassengers(passengers) {
  return {
    type: ACTION_SET_PASSENGERS,
    value: passengers,
  };
}
export function setMenu(menu) {
  return {
    type: ACTION_SET_MENU,
    value: menu,
  };
}
export function setIsMenuVisible(isMenuVisible) {
  return {
    type: ACTION_SET_ISMENUVISIBLE,
    value: isMenuVisible,
  };
}
export function setSearchParsed(searchParsed) {
  return {
    type: ACTION_SET_SEARCHPARSED,
    value: searchParsed,
  };
}

export function fetchInitial(url) {
  return (dispatch, getState) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const {
          departTimeStr,
          arriveTimeStr,
          arriveDate,
          durationStr,
          price,
        } = data;
        dispatch(setDepartTimeStr(departTimeStr));
        dispatch(setArriveTimeStr(arriveTimeStr));
        dispatch(setArriveDate(arriveDate));
        dispatch(setDurationStr(durationStr));
        dispatch(setPrice(price));
      });
  };
}
