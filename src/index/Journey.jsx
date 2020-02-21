import React from 'react';
import switchImg from './imgs/switch.svg';
import './Journey.css';

export default function Journey(props) {
  const { from, to, exchangeFromTo, showCityPicker } = props;
  return (
    <div className='journey'>
      <div className='journey-station' onClick={() => showCityPicker(true)}>
        <input
          type='text'
          readOnly
          name='from'
          value={from}
          className='journey-input journey-from'
        />
      </div>
      <div className='journey-switch' onClick={() => exchangeFromTo()}>
        <img src={switchImg} width='70' height='40' alt='switch img' />
      </div>
      <div className='journey-station' onClick={() => showCityPicker(false)}>
        <input
          type='text'
          readOnly
          name='to'
          value={to}
          className='journey-input journey-to'
        />
      </div>
    </div>
  );
}
