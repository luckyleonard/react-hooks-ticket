import React, { useCallback, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DepartDate from './DepartDate';
import HighSpeed from './HighSpeed';
import Journey from './Journey';
import Submit from './Submit';
import Header from '../common/Header';
import CitySelector from '../common/CitySelector';
import DateSelector from '../common/DateSelector';
import { formatDate } from '../common/dateFormater';
import {
  exchangeFromTo,
  showCityPicker,
  hideCityPicker,
  fetchCityData,
  setPickedCity,
  showDatePicker,
  hideDatePicker,
  setDepartDate,
  toggleHighSpeed
} from './store/actionCreator';
import './App.css';

function App(props) {
  const {
    from,
    to,
    isCityPickerVisible,
    isDatePickerVisible,
    cityData,
    isLoadingCityData,
    departDate,
    highSpeedPick,
    dispatch
  } = props;

  const onBack = useCallback(() => {
    window.history.back();
  }, []); // Prevent meaningless rerender

  const journeyCallbacks = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo,
        showCityPicker
      },
      dispatch
    );
  }, []);

  const citySelectorCallbacks = useMemo(() => {
    return bindActionCreators(
      { onBack: hideCityPicker, fetchCityData, onSelect: setPickedCity },
      dispatch
    );
  }, []);

  const departDateCallbacks = useMemo(() => {
    return bindActionCreators({ onClick: showDatePicker }, dispatch);
  }, []);

  const dateSelectorCallbacks = useMemo(() => {
    return bindActionCreators({ onBack: hideDatePicker }, dispatch);
  }, []);

  const onSelectDate = useCallback(day => {
    if (!day) {
      return;
    }
    if (day < formatDate()) {
      return;
    }

    dispatch(setDepartDate(day));
    dispatch(hideDatePicker());
  }, []);

  const highSpeedCallbacks = useMemo(() => {
    return bindActionCreators({ toggle: toggleHighSpeed }, dispatch);
  }, []);

  return (
    <div>
      <div className='header-wrapper'>
        <Header title='Ticket System' onBack={onBack} />
      </div>
      <form action='./query.html' className='form'>
        <Journey from={from} to={to} {...journeyCallbacks} />
        <DepartDate time={departDate} {...departDateCallbacks} />
        <HighSpeed highSpeed={highSpeedPick} {...highSpeedCallbacks} />
        <Submit></Submit>
      </form>
      <CitySelector
        show={isCityPickerVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCallbacks}
      />
      <DateSelector
        show={isDatePickerVisible}
        {...dateSelectorCallbacks}
        onSelect={onSelectDate}
      />
    </div>
  );
}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch };
  }
)(App);
