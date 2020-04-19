import React, { useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import URI from 'urijs';
import dayjs from 'dayjs';
import { formatDate } from '../common/dateFormater';
import useNav from '../common/useNav';

import Header from '../common/Header';
import Nav from '../common/Nav';
import Detail from '../common/Detail';
import Candidate from './Candidate';
import { TrainContext } from './context';
import './App.css';

import {
  setDepartStation,
  setArriveStation,
  setTrainNumber,
  setDepartDate,
  setSearchParsed,
  nextDate,
  prevDate,
  setDepartTimeStr,
  setArriveTimeStr,
  setArriveDate,
  setDurationStr,
  setTickets,
  toggleIsScheduleVisible,
} from './store/actionCreator';

const Schedule = lazy(() => import('./Schedule'));

function App(props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStation,
    arriveStation,
    trainNumber,
    durationStr,
    tickets,
    isScheduleVisible,
    searchParsed,
    dispatch,
  } = props;

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const { aStation, dStation, trainNumber, date } = queries;
    dispatch(setDepartStation(dStation));
    dispatch(setArriveStation(aStation));
    dispatch(setTrainNumber(trainNumber));
    dispatch(setDepartDate(formatDate(dayjs(date).valueOf())));
    dispatch(setSearchParsed(true));
  }, [dispatch]);

  useEffect(() => {
    document.title = trainNumber;
    return () => {
      document.title = 'Booking Ticket';
    };
  }, [trainNumber]);

  useEffect(() => {
    if (!searchParsed) {
      return;
    }

    const url = new URI('/rest/ticket')
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('trainNumber', trainNumber)
      .toString();

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        const { detail, candidates } = result;

        const {
          departTimeStr,
          arriveTimeStr,
          arriveDate,
          durationStr,
        } = detail;

        dispatch(setDepartTimeStr(departTimeStr));
        dispatch(setArriveTimeStr(arriveTimeStr));
        dispatch(setArriveDate(arriveDate));
        dispatch(setDurationStr(durationStr));
        dispatch(setTickets(candidates));
      });
  }, [searchParsed, departDate, trainNumber, dispatch]);

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  const { prev, next, isPrevDisabled, isNextDisabled } = useNav(
    departDate,
    dispatch,
    prevDate,
    nextDate
  ); //给Nav组件使用

  const detailCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggleIsScheduleVisible,
      },
      dispatch
    );
  }, [dispatch]);

  if (!searchParsed) {
    return null;
    //在没解析完成之前不渲染，相当于第一次渲染时直接返回并执行useEffect
  }

  return (
    <div className='app'>
      <div className='header-wrapper'>
        <Header title={trainNumber} onBack={onBack} />
      </div>
      <div className='nav-wrapper'>
        <Nav
          date={departDate}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          prev={prev}
          next={next}></Nav>
      </div>
      <div className='detail-wrapper'>
        <Detail
          departDate={departDate}
          arriveDate={arriveDate}
          departTimeStr={departTimeStr}
          arriveTimeStr={arriveTimeStr}
          trainNumber={trainNumber}
          departStation={departStation}
          arriveStation={arriveStation}
          durationStr={durationStr}
          {...detailCbs}
        />
      </div>
      <TrainContext.Provider
        value={{ trainNumber, departStation, arriveStation, departDate }}>
        <Candidate tickets={tickets} />
      </TrainContext.Provider>
      {isScheduleVisible && (
        <div
          className='mask'
          onClick={() => dispatch(toggleIsScheduleVisible())}>
          <Suspense fallback={<div>loading</div>}>
            <Schedule
              date={departDate}
              trainNumber={trainNumber}
              departStation={departStation}
              arriveStation={arriveStation}
            />
          </Suspense>
        </div>
      )}
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
