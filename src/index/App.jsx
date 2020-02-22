import React, { useCallback, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.css';
import Header from '../common/Header.jsx';
import DepartDate from './DepartDate.jsx';
import HighSpeed from './HighSpeed.jsx';
import Journey from './Journey.jsx';
import Submit from './Submit.jsx';
import CitySelector from '../common/CitySelector.jsx';
import {
  exchangeFromTo,
  showCityPicker,
  hideCityPicker,
  fetchCityData,
  setPickedCity
} from './store/actionCreator';

function App(props) {
  const {
    from,
    to,
    isCityPickerVisible,
    cityData,
    isLoadingCityData,
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

  return (
    <div>
      <div className='header-wrapper'>
        <Header title='Ticket System' onBack={onBack} />
      </div>
      <form className='form'>
        <Journey from={from} to={to} {...journeyCallbacks} />
        <DepartDate></DepartDate>
        <HighSpeed></HighSpeed>
        <Submit></Submit>
      </form>
      <CitySelector
        show={isCityPickerVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCallbacks}
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
