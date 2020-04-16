import {
  ACTION_SET_FROM,
  ACTION_SET_TO,
  ACTION_SET_DEPART_DATE,
  ACTION_SET_HIGH_SPEED,
  ACTION_SET_TRIP_LIST,
  ACTION_SET_ORDER_TYPES,
  ACTION_SET_ONLY_TICKETS,
  ACTION_SET_TICKET_TYPES,
  ACTION_SET_CHECKED_TICKET_TYPES,
  ACTION_SET_TRIP_TYPES,
  ACTION_SET_CHECKED_TRIP_TYPES,
  ACTION_SET_DEPART_STATIONS,
  ACTION_SET_CHECKED_DEPART_STATIONS,
  ACTION_SET_ARRIVE_STATIONS,
  ACTION_SET_CHECKED_ARRIVE_STATIONS,
  ACTION_SET_DEPART_TIME_START,
  ACTION_SET_DEPART_TIME_END,
  ACTION_SET_ARRIVE_TIME_START,
  ACTION_SET_ARRIVE_TIME_END,
  ACTION_SET_IS_FILTERS_VISIBLE,
  ACTION_SET_SEARCH_PARSED,
} from './actionCreator';
import { ORDER_DEPART } from '../constant';
export default {
  from(state = null, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_FROM:
        return value;
      default:
    }
    return state;
  },
  to(state = null, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_TO:
        return value;
      default:
    }
    return state;
  },
  departDate(state = Date.now(), action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_DEPART_DATE:
        return value;
      default:
    }
    return state;
  },
  highSpeed(state = false, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_HIGH_SPEED:
        return value;
      case ACTION_SET_CHECKED_TRIP_TYPES:
        const checkedTripTypes = value;
        return Boolean(checkedTripTypes[1] && checkedTripTypes[5]);
      default:
    }
    return state;
  },
  tripList(state = [], action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_TRIP_LIST:
        return value;
      default:
    }
    return state;
  },
  orderTyps(state = ORDER_DEPART, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_ORDER_TYPES:
        return value;
      default:
    }
    return state;
  },
  onlyTickets(state = false, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_ONLY_TICKETS:
        return value;
      default:
    }
    return state;
  },
  ticketTypes(state = [], action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_TICKET_TYPES:
        return value;
      default:
    }
    return state;
  },
  checkedTicketTypes(state = {}, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_CHECKED_TICKET_TYPES:
        return value;
      default:
    }
    return state;
  },
  tripTypes(state = [], action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_TRIP_TYPES:
        return value;
      default:
    }
    return state;
  },
  checkedTripTypes(state = {}, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_CHECKED_TRIP_TYPES:
        return value;
      case ACTION_SET_HIGH_SPEED:
        const highSpeed = value;
        const newCheckedTrainTypes = { ...state };
        if (highSpeed) {
          newCheckedTrainTypes[1] = true;
          newCheckedTrainTypes[5] = true;
        } else {
          delete newCheckedTrainTypes[1];
          delete newCheckedTrainTypes[5];
        }
        return newCheckedTrainTypes;
      default:
    }
    return state;
  },
  departStations(state = [], action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_DEPART_STATIONS:
        return value;
      default:
    }
    return state;
  },
  checkedDepartStations(state = {}, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_CHECKED_DEPART_STATIONS:
        return value;
      default:
    }
    return state;
  },
  arriveStations(state = [], action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_ARRIVE_STATIONS:
        return value;
      default:
    }
    return state;
  },
  checkedArriveStations(state = {}, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_CHECKED_ARRIVE_STATIONS:
        return value;
      default:
    }
    return state;
  },
  departTimeStart(state = 0, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_DEPART_TIME_START:
        return value;
      default:
    }
    return state;
  },
  departTimeEnd(state = 24, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_DEPART_TIME_END:
        return value;
      default:
    }
    return state;
  },
  arriveTimeStart(state = 0, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_ARRIVE_TIME_START:
        return value;
      default:
    }
    return state;
  },
  arriveTimeEnd(state = 24, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_ARRIVE_TIME_END:
        return value;
      default:
    }
    return state;
  },
  isFiltersVisible(state = false, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_IS_FILTERS_VISIBLE:
        return value;
      default:
    }
    return state;
  },
  searchParsed(state = false, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_SEARCH_PARSED:
        return value;
      default:
    }
    return state;
  },
};
