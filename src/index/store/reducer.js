import {
  ACTION_SET_FROM,
  ACTION_SET_TO,
  ACTION_SET_IS_CITY_PICKER_VISIBLE,
  ACTION_SET_CURRENT_PICKING_LEFT_CITY,
  ACTION_SET_CITY_DATA,
  ACTION_SET_IS_LOADING_CITY_DATA,
  ACTION_SET_IS_DATE_PICKER_VISIBLE,
  ACTION_SET_HIGH_SPEED_PICK,
  ACTION_SET_DEPART_DATE,
} from './actionCreator';

export default {
  from(state = 'Melbourne', action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_FROM:
        return value;
      default:
    }

    return state;
  },
  to(state = 'Sydney', action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_TO:
        return value;
      default:
    }

    return state;
  },
  isCityPickerVisible(state = false, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_IS_CITY_PICKER_VISIBLE:
        return value;
      default:
    }

    return state;
  },
  currentPickingLeftCity(state = false, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_CURRENT_PICKING_LEFT_CITY:
        return value;
      default:
    }

    return state;
  },
  cityData(state = null, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_CITY_DATA:
        return value;
      default:
    }

    return state;
  },
  isLoadingCityData(state = false, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_IS_LOADING_CITY_DATA:
        return value;
      default:
    }

    return state;
  },
  isDatePickerVisible(state = false, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_IS_DATE_PICKER_VISIBLE:
        return value;
      default:
    }

    return state;
  },
  highSpeedPick(state = false, action) {
    const { type, value } = action;
    switch (type) {
      case ACTION_SET_HIGH_SPEED_PICK:
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
};
