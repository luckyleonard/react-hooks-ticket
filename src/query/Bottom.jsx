import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Bottom.css';
import { ORDER_DEPART } from './constant';
import Slider from './Slider';

const Filter = memo(function Filter(props) {
  const { name, checked, toggle, value } = props;

  return (
    <li className={classnames({ checked })} onClick={() => toggle(value)}>
      {name}
    </li>
  );
});

const Option = memo(function Option(props) {
  const { title, options, checkedMap, update } = props;

  const toggle = useCallback(
    value => {
      const newCheckedMap = { ...checkedMap };

      if (value in checkedMap) {
        delete newCheckedMap[value];
      } else {
        newCheckedMap[value] = true;
      } //in 方法判断obj的属性名，不判断属性值

      update(newCheckedMap);
    },
    [checkedMap, update]
  );

  return (
    <div className='option'>
      <h3>{title}</h3>
      <ul>
        {options.map(option => {
          return (
            <Filter
              key={option.value}
              {...option}
              checked={option.value in checkedMap}
              toggle={toggle}
            />
          );
        })}
      </ul>
    </div>
  );
});

const BottomModal = memo(function BottomModal(props) {
  const {
    ticketTypes,
    tripTypes,
    departStations,
    arriveStations,
    checkedTicketTypes,
    checkedTripTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    setCheckedTicketTypes,
    setCheckedTripTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd
  } = props;

  const [localCheckedTicketTypes, setLocalCheckedTicketTypes] = useState(() => {
    return {
      ...checkedTicketTypes
    };
  }); //延迟初始化，只设置一次

  const [localCheckedTripTypes, setLocalCheckedTripTypes] = useState(() => {
    return {
      ...checkedTripTypes
    };
  });
  const [localCheckedDepartStations, setLocalCheckedDepartStations] = useState(
    () => {
      return {
        ...checkedDepartStations
      };
    }
  );
  const [localCheckedArriveStations, setLocalCheckedArriveStations] = useState(
    () => {
      return {
        ...checkedArriveStations
      };
    }
  );

  const [localDepartTimeStart, setLocalDepartTimeStart] = useState(
    departTimeStart
  );
  const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd);
  const [localArriveTimeStart, setLocalArriveTimeStart] = useState(
    arriveTimeStart
  );
  const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd);

  const optionGroup = [
    {
      title: 'Ticket Types',
      options: ticketTypes,
      checkedMap: localCheckedTicketTypes,
      update: setLocalCheckedTicketTypes
    },
    {
      title: 'Trip Types',
      options: tripTypes,
      checkedMap: localCheckedTripTypes,
      update: setLocalCheckedTripTypes
    },
    {
      title: 'Depart Station',
      options: departStations,
      checkedMap: localCheckedDepartStations,
      update: setLocalCheckedDepartStations
    },
    {
      title: 'Arrival Station',
      options: arriveStations,
      checkedMap: localCheckedArriveStations,
      update: setLocalCheckedArriveStations
    }
  ];

  return (
    <div className='bottom-modal'>
      <div className='bottom-dialog'>
        <div className='bottom-dialog-content'>
          <div className='title'>
            <span className='reset'>Reset</span>
            <span className='ok'>Confirm</span>
          </div>
          <div className='options'>
            {optionGroup.map(group => {
              return <Option {...group} key={group.title} />;
            })}
            <Slider
              title='Depart Time'
              currentStartHours={localDepartTimeStart}
              currentEndHours={localDepartTimeEnd}
              onStartChanged={setLocalDepartTimeStart}
              onEndChanged={setLocalDepartTimeEnd}
            />
            <Slider
              title='Arrive Time'
              currentStartHours={localArriveTimeStart}
              currentEndHours={localArriveTimeEnd}
              onStartChanged={setLocalArriveTimeStart}
              onEndChanged={setLocalArriveTimeEnd}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default function Bottom(props) {
  const {
    toggleOrderTypes,
    toggleHighSpeed,
    toggleOnlyTickets,
    toggleIsFiltersVisible,
    highSpeed,
    orderTyps,
    onlyTickets,
    isFiltersVisible,
    ticketTypes,
    tripTypes,
    departStations,
    arriveStations,
    checkedTicketTypes,
    checkedTripTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    setCheckedTicketTypes,
    setCheckedTripTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd
  } = props;

  return (
    <div className='bottom'>
      <div className='bottom-filters'>
        <span className='item' onClick={toggleOrderTypes}>
          <i className='icon'>&#xf065;</i>
          {orderTyps === ORDER_DEPART ? 'Depart Time' : 'Duration'}
        </span>
        <span
          className={classnames('item', { 'item-on': highSpeed })}
          onClick={toggleHighSpeed}>
          <i className='icon'>{highSpeed ? '\uf43f' : '\uf43e'}</i>
          Direct Fly
        </span>
        <span
          className={classnames('item', { 'item-on': onlyTickets })}
          onClick={toggleOnlyTickets}>
          <i className='icon'>{onlyTickets ? '\uf43d' : '\uf43c'}</i>
          Available
        </span>
        <span
          className={classnames('item', { 'item-on': isFiltersVisible })}
          onClick={toggleIsFiltersVisible}>
          <i className='icon'>{'\uf0f7'}</i>
          Filter
        </span>
      </div>
      {isFiltersVisible && (
        <BottomModal
          ticketTypes={ticketTypes}
          tripTypes={tripTypes}
          departStations={departStations}
          arriveStations={arriveStations}
          checkedTicketTypes={checkedTicketTypes}
          checkedTripTypes={checkedTripTypes}
          checkedDepartStations={checkedDepartStations}
          checkedArriveStations={checkedArriveStations}
          departTimeStart={departTimeStart}
          departTimeEnd={departTimeEnd}
          arriveTimeStart={arriveTimeStart}
          arriveTimeEnd={arriveTimeEnd}
          setCheckedTicketTypes={setCheckedTicketTypes}
          setCheckedTripTypes={setCheckedTripTypes}
          setCheckedDepartStations={setCheckedDepartStations}
          setCheckedArriveStations={setCheckedArriveStations}
          setDepartTimeStart={setDepartTimeStart}
          setDepartTimeEnd={setDepartTimeEnd}
          setArriveTimeStart={setArriveTimeStart}
          setArriveTimeEnd={setArriveTimeEnd}
        />
      )}
    </div>
  );
}

Bottom.propTypes = {
  toggleOrderTypes: PropTypes.func.isRequired,
  toggleHighSpeed: PropTypes.func.isRequired,
  toggleOnlyTickets: PropTypes.func.isRequired,
  toggleIsFiltersVisible: PropTypes.func.isRequired,
  highSpeed: PropTypes.bool.isRequired,
  orderTyps: PropTypes.number.isRequired,
  onlyTickets: PropTypes.bool.isRequired,
  isFiltersVisible: PropTypes.bool.isRequired
};
