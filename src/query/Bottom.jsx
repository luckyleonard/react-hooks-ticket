import React, { memo, useState, useCallback, useMemo } from 'react';
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
    setArriveTimeEnd,
    toggleIsFiltersVisible
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

  function confirm() {
    setCheckedTicketTypes(localCheckedTicketTypes);
    setCheckedTripTypes(localCheckedTripTypes);
    setCheckedDepartStations(localCheckedDepartStations);
    setCheckedArriveStations(localCheckedArriveStations);

    setDepartTimeStart(localDepartTimeStart);
    setDepartTimeEnd(localDepartTimeEnd);
    setArriveTimeStart(localArriveTimeStart);
    setArriveTimeEnd(localArriveTimeEnd);
    toggleIsFiltersVisible();
  } //提交缓冲区数据到redux store 触发fetch side effect

  const isResetDisabled = useMemo(() => {
    return (
      Object.keys(localCheckedTicketTypes).length === 0 &&
      Object.keys(localCheckedTripTypes).length === 0 &&
      Object.keys(localCheckedDepartStations).length === 0 &&
      Object.keys(localCheckedArriveStations).length === 0 &&
      localDepartTimeStart === 0 &&
      localDepartTimeEnd === 24 &&
      localArriveTimeStart === 0 &&
      localArriveTimeEnd === 24
    );
  }, [
    localCheckedTicketTypes,
    localCheckedTripTypes,
    localCheckedDepartStations,
    localCheckedArriveStations,
    localDepartTimeStart,
    localDepartTimeEnd,
    localArriveTimeStart,
    localArriveTimeEnd
  ]);

  function reset() {
    if (isResetDisabled) {
      return;
    }

    setLocalCheckedTicketTypes({});
    setLocalCheckedTripTypes({});
    setLocalCheckedDepartStations({});
    setLocalCheckedArriveStations({});
    setLocalDepartTimeStart(0);
    setLocalDepartTimeEnd(24);
    setLocalArriveTimeStart(0);
    setLocalArriveTimeEnd(24);
  } //重置组件内缓冲初始值

  return (
    <div className='bottom-modal'>
      <div className='bottom-dialog'>
        <div className='bottom-dialog-content'>
          <div className='title'>
            <span
              className={classnames('reset', { disabled: isResetDisabled })}
              onClick={reset}>
              Reset
            </span>
            <span className='ok' onClick={confirm}>
              Confirm
            </span>
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

  const noChecked = useMemo(() => {
    return (
      Object.keys(checkedTicketTypes).length === 0 &&
      Object.keys(checkedTripTypes).length === 0 &&
      Object.keys(checkedDepartStations).length === 0 &&
      Object.keys(checkedArriveStations).length === 0 &&
      departTimeStart === 0 &&
      departTimeEnd === 24 &&
      arriveTimeStart === 0 &&
      arriveTimeEnd === 24
    );
  }, [
    checkedTicketTypes,
    checkedTripTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd
  ]);

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
          className={classnames('item', {
            'item-on': isFiltersVisible || !noChecked
          })}
          onClick={toggleIsFiltersVisible}>
          <i className='icon'>{noChecked ? '\uf0f7' : '\uf446'}</i>
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
          toggleIsFiltersVisible={toggleIsFiltersVisible}
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
