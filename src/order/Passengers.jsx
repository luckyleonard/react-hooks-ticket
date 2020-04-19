import React, { memo } from 'react';

import propTypes from 'prop-types';
import './Passengers.css';

const Passenger = memo(function Passenger(props) {
  return <li>{props.id}</li>;
});

const Passengers = memo(function Passengers(props) {
  const { passengers, createAdult, createChild } = props;
  return (
    <div className='passengers'>
      <ul>
        {passengers.map((passenger) => {
          return <Passenger {...passenger} key={passenger.id} />;
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
