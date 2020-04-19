import {
  ACTION_SET_TRAINNUMBER,
  ACTION_SET_DEPARTSTATION,
  ACTION_SET_ARRIVESTATION,
  ACTION_SET_SEATTYPE,
  ACTION_SET_DEPARTDATE,
  ACTION_SET_ARRIVEDATE,
  ACTION_SET_DEPARTTIMESTR,
  ACTION_SET_ARRIVETIMESTR,
  ACTION_SET_DURATIONSTR,
  ACTION_SET_PRICE,
  ACTION_SET_PASSENGERS,
  ACTION_SET_MENU,
  ACTION_SET_ISMENUVISIBLE,
  ACTION_SET_SEARCHPARSED,
} from './actionCreator';

export default {
  trainNumber(state = null, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_TRAINNUMBER:
        return value;
      default:
    }
    return state;
  },
  departStation(state = null, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_DEPARTSTATION:
        return value;
      default:
    }
    return state;
  },
  arriveStation(state = null, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_ARRIVESTATION:
        return value;
      default:
    }
    return state;
  },
  seatType(state = null, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_SEATTYPE:
        return value;
      default:
    }
    return state;
  },
  departDate(state = null, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_DEPARTDATE:
        return value;
      default:
    }
    return state;
  },
  arriveDate(state = null, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_ARRIVEDATE:
        return value;
      default:
    }
    return state;
  },
  departTimeStr(state = null, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_DEPARTTIMESTR:
        return value;
      default:
    }
    return state;
  },
  arriveTimeStr(state = null, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_ARRIVETIMESTR:
        return value;
      default:
    }
    return state;
  },
  durationStr(state = null, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_DURATIONSTR:
        return value;
      default:
    }
    return state;
  },
  price(state = null, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_PRICE:
        return value;
      default:
    }
    return state;
  },
  passengers(state = [], action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_PASSENGERS:
        return value;
      default:
    }
    return state;
  },
  menu(state = null, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_MENU:
        return value;
      default:
    }
    return state;
  },
  isMenuVisible(state = false, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_ISMENUVISIBLE:
        return value;
      default:
    }
    return state;
  },
  searchParsed(state = false, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_SEARCHPARSED:
        return value;
      default:
    }
    return state;
  },
};
