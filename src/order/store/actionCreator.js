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

let passengerIdSeed = 0;

export function createAdult() {
  return (dispatch, getState) => {
    const { passengers } = getState();

    for (let passenger of passengers) {
      const keys = Object.keys(passenger);
      for (let key of keys) {
        if (!passenger[key]) {
          return;
        }
      }
    }
    dispatch(
      setPassengers([
        ...passengers,
        {
          id: ++passengerIdSeed,
          name: '',
          ticketType: 'adult',
          licenceNo: '',
          seat: 'Z',
        },
      ])
    );
  };
}

export function createChild() {
  return (dispatch, getState) => {
    const { passengers } = getState();

    let adultFound = null;

    for (let passenger of passengers) {
      const keys = Object.keys(passenger);
      for (let key of keys) {
        if (!passenger[key]) {
          return; //有字段为空则直接返回，阻止继续添加
        }
      }
      if (passenger.ticketType === 'adult') {
        adultFound = passenger.id; //找到成人则把id存下来
      }
    }

    if (!adultFound) {
      alert('Add at least one adult');
      return; //找不到成人则弹出提示，并阻止添加
    }

    dispatch(
      setPassengers([
        ...passengers,
        {
          id: ++passengerIdSeed,
          name: '',
          gender: 'none',
          birthday: '',
          followAdult: adultFound,
          ticketType: 'child',
          seat: 'Z',
        },
      ])
    );
  };
}

export function removePassenger(id) {
  return (dispatch, getState) => {
    const { passengers } = getState();
    const newPassengers = passengers.filter((passenger) => {
      return passenger.id !== id && passenger.followAdult !== id;
    }); //除了去除这个编号的人，当删除一个成人时，这个人底下绑定的儿童也需要删除
    dispatch(setPassengers(newPassengers));
  };
}

export function updatePassenger(id, data) {
  return (dispatch, getState) => {
    const { passengers } = getState();

    for (let i = 0; i < passengers.length; i++) {
      if (passengers[i].id === id) {
        const newPassengers = [...passengers];
        newPassengers[i] = Object.assign({}, passengers[i], data);
        //生成一个新对象并把原有的数据和新加入的数据data一起返回
        dispatch(setPassengers(newPassengers));
        break;
      }
    }
  };
}
