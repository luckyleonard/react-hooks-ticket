import React, { memo } from 'react';

import propTypes from 'prop-types';
import './Passengers.css';

const Passenger = memo(function Passenger(props) {
  const {
    id,
    name,
    followAdult,
    ticketType,
    licenceNo,
    gender,
    birthday,
    onRemove,
    onUpdate,
  } = props;

  const isAdult = ticketType === 'adult';

  return (
    <li className='passenger'>
      <i className='delete' onClick={() => onRemove(id)}>
        -
      </i>
      <ol className='items'>
        <li className='item'>
          <label className='label name'>Name</label>
          <input
            type='text'
            className='input name'
            placeholder='Passenger Name'
            value={name}
            onChange={(e) => onUpdate(id, { name: e.target.value })}
          />
          <label className='ticket-type'>{isAdult ? '成人票' : '儿童票'}</label>
        </li>
        {isAdult && (
          <li className='item'>
            <label className='label licenceNo'>ID</label>
            <input
              type='text'
              className='input licenceNo'
              placeholder='Personal ID'
              value={licenceNo}
              onChange={(e) => onUpdate(id, { licenceNo: e.target.value })}
            />
          </li>
        )}
        {!isAdult && (
          <li className='item arrow'>
            <label className='label gender'>Gender</label>
            <input
              type='text'
              className='input gender'
              placeholder='Please select'
              value={
                gender === 'male' ? 'Male' : gender === 'female' ? 'Female' : ''
              }
              readOnly
              // onChange={(e) => onUpdate(id, { gender: e.target.value })}
            />
          </li>
        )}
        {!isAdult && (
          <li className='item'>
            <label className='label birthday'>Birthday</label>
            <input
              type='text'
              className='input birthday'
              placeholder='I.E. 20000731'
              value={birthday}
              onChange={(e) => onUpdate(id, { birthday: e.target.value })}
            />
          </li>
        )}
        {!isAdult && (
          <li className='item arrow'>
            <label className='label followAdult'>同行成人</label>
            <input
              type='text'
              className='input followAdult'
              placeholder='Please select'
              value={followAdult}
              readOnly
              // onChange={(e) => onUpdate(id, { gender: e.target.value })}
            />
          </li>
        )}
      </ol>
    </li>
  );
});

const Passengers = memo(function Passengers(props) {
  const {
    passengers,
    createAdult,
    createChild,
    removePassenger,
    updatePassenger,
  } = props;
  return (
    <div className='passengers'>
      <ul>
        {passengers.map((passenger) => {
          return (
            <Passenger
              {...passenger}
              key={passenger.id}
              onRemove={removePassenger}
              onUpdate={updatePassenger}
            />
          );
        })}
      </ul>
      <section className='add'>
        <div className='adult' onClick={() => createAdult()}>
          Add adult
        </div>
        <div className='child' onClick={() => createChild()}>
          Add child
        </div>
      </section>
    </div>
  );
});

export default Passengers;
