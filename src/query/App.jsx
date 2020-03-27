import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import URI from 'urijs';
import dayjs from 'dayjs';

import './App.css';
import { formatDate } from '../common/dateFormater';
import Header from '../common/Header';
import Nav from '../common/Nav';
import useNav from '../common/useNav';
import List from './List';
import Bottom from './Bottom';

import {
  setFrom,
  setTo,
  setDepartDate,
  setHighSpeed,
  setSearchParsed,
  setTripList,
  setTicketTypes,
  setTripTypes,
  setDepartStations,
  setArriveStations,
  prevDate,
  nextDate,
  toggleOrderTypes,
  toggleHighSpeed,
  toggleOnlyTickets,
  toggleIsFiltersVisible
} from './store/actionCreator';

function App(props) {
  const {
    from,
    to,
    departDate,
    highSpeed,
    orderTyps,
    onlyTickets,
    checkedTicketTypes,
    checkedTripTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    searchParsed,
    dispatch,
    tripList,
    isFiltersVisible
  } = props;

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const { from, to, date, highSpeed } = queries;
    dispatch(setFrom(from));
    dispatch(setTo(to));
    dispatch(setDepartDate(formatDate(dayjs(date).valueOf())));
    dispatch(setHighSpeed(highSpeed === 'true'));
    dispatch(setSearchParsed(true));
  }, []);

  useEffect(() => {
    if (!searchParsed) {
      return;
    }
    const url = new URI('/rest/query')
      .setSearch('from', from)
      .setSearch('to', to)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('highSpeed', highSpeed)
      .setSearch('orderTyps', orderTyps)
      .setSearch('onlyTickets', onlyTickets)
      .setSearch('checkedTicketTypes', Object.keys(checkedTicketTypes).join())
      .setSearch('checkedTripTypes', Object.keys(checkedTripTypes).join())
      .setSearch(
        'checkedDepartStations',
        Object.keys(checkedDepartStations).join()
      )
      .setSearch(
        'checkedArriveStations',
        Object.keys(checkedArriveStations).join()
      )
      .setSearch('departTimeStart', departTimeStart)
      .setSearch('departTimeEnd', departTimeEnd)
      .setSearch('arriveTimeStart', arriveTimeStart)
      .setSearch('arriveTimeEnd', arriveTimeEnd)
      .toString();

    fetch(url)
      .then(response => response.json())
      .then(result => {
        const {
          dataMap: {
            directTrainInfo: {
              trains,
              filter: { ticketType, trainType, depStation, arrStation }
            }
          }
        } = result;
        dispatch(setTripList(trains));
        dispatch(setTicketTypes(ticketType));
        dispatch(setTripTypes(trainType));
        dispatch(setDepartStations(depStation));
        dispatch(setArriveStations(arrStation));
      });
  }, [
    searchParsed,
    from,
    to,
    departDate,
    highSpeed,
    orderTyps,
    onlyTickets,
    checkedTicketTypes,
    checkedTripTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    dispatch
  ]);

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  const { prev, next, isPrevDisabled, isNextDisabled } = useNav(
    departDate,
    dispatch,
    prevDate,
    nextDate
  );

  const bottomCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggleOrderTypes,
        toggleHighSpeed,
        toggleOnlyTickets,
        toggleIsFiltersVisible
      },
      dispatch
    );
  }, []);

  if (!searchParsed) {
    return null;
  } // 没获取数据之前不渲染任何东西，错误处理

  return (
    <>
      <div className='header-wrapper'>
        <Header title={`${from} -> ${to}`} onBack={onBack} />
      </div>
      <Nav
        date={departDate}
        prev={prev}
        next={next}
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
      />
      <List list={tripList} />
      <Bottom
        highSpeed={highSpeed}
        orderTyps={orderTyps}
        onlyTickets={onlyTickets}
        isFiltersVisible={isFiltersVisible}
        {...bottomCbs}
      />
    </>
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
