export const ACTION_SET_FROM = 'SET_FROM';
export const ACTION_SET_TO = 'SET_TO';
export const ACTION_SET_IS_CITY_PICKER_VISIBLE = 'SET_IS_CITY_PICKER_VISIBLE';
export const ACTION_SET_CURRENT_PICKING_LEFT_CITY =
  'SET_CURRENT_PICKING_LEFT_CITY';
export const ACTION_SET_CITY_DATA = 'SET_CITY_DATA';
export const ACTION_SET_IS_LOADING_CITY_DATA = 'SET_IS_LOADING_CITY_DATA';
export const ACTION_SET_IS_DATE_PICKER_VISIBLE = 'SET_IS_DATE_PICKER_VISIBLE';
export const ACTION_SET_HIGH_SPEED_PICK = 'SET_HIGH_SPEED_PICK';

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

export function setIsLoadingCityData(isLoadingCityData) {
  return {
    type: ACTION_SET_IS_LOADING_CITY_DATA,
    value: isLoadingCityData
  };
}

export function setCityData(cityData) {
  return {
    type: ACTION_SET_CITY_DATA,
    value: cityData
  };
}

export function toggleHighSpeed() {
  return (dispatch, getState) => {
    const { highSpeedPick } = getState();
    dispatch({
      type: ACTION_SET_HIGH_SPEED_PICK,
      value: !highSpeedPick
    });
  };
}

export function showCityPicker(currentPickngLeftCity) {
  return dispatch => {
    dispatch({
      type: ACTION_SET_IS_CITY_PICKER_VISIBLE,
      value: true
    });
    dispatch({
      type: ACTION_SET_CURRENT_PICKING_LEFT_CITY,
      value: currentPickngLeftCity
    });
  };
}

export function hideCityPicker() {
  return {
    type: ACTION_SET_IS_CITY_PICKER_VISIBLE,
    value: false
  };
}

export function setPickedCity(city) {
  return (dispatch, getState) => {
    const { currentPickngLeftCity } = getState();

    if (currentPickngLeftCity) {
      dispatch(setFrom(city));
    } else {
      dispatch(setTo(city));
    }
  };
}

export function showDatePicker() {
  return {
    type: ACTION_SET_IS_DATE_PICKER_VISIBLE,
    value: true
  };
}

export function hideDatePicker() {
  return {
    type: ACTION_SET_IS_DATE_PICKER_VISIBLE,
    value: false
  };
}

export function exchangeFromTo() {
  return (dispatch, getState) => {
    const { from, to } = getState();
    dispatch(setFrom(to));
    dispatch(setTo(from));
  };
}

export function fetchCityData() {
  return (dispatch, getState) => {
    const { isLoadingCityData } = getState();
    if (isLoadingCityData) {
      return;
    }

    const cache = JSON.parse(localStorage.getItem('city_data_cache') || '{}'); //init empty value
    if (Date.now() < cache.expires) {
      dispatch(setCityData(cache.data));
      return;
    }

    dispatch(setIsLoadingCityData(true));
    fetch('/rest/cities?_' + Date.now())
      .then(res => res.json())
      .then(cityData => {
        dispatch(setCityData(cityData));

        localStorage.setItem(
          'city_data_cache',
          JSON.stringify({ expires: Date.now() + 60 * 1000, data: cityData })
        ); //write data into localStorage with expiry time for 60s

        dispatch(setIsLoadingCityData(false));
      })
      .catch(() => {
        dispatch(setIsLoadingCityData(false));
      });
  };
}
