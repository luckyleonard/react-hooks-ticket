import React, { memo } from 'react';

import propTypes from 'prop-types';
import classnames from 'classnames';
import './Choose.css';

const Choose = memo(function Choose(props) {
  const { passengers, updatePassenger } = props;

  function createSeat(seatType) {
    return (
      <div>
        {passengers.map((passenger) => {
          return (
            <p
              key={passenger.id}
              className={classnames('seat', {
                active: passenger.seat === seatType,
              })}
              data-text={seatType}
              onClick={() =>
                updatePassenger(passenger.id, {
                  seat: seatType,
                })
              }
            >
              &#xe02d;
            </p>
          );
        })}
      </div>
    );
    //座次图使用iconfont 配合 attr(data-text)属性，在CSS中调用配合::after 里的content
  }

  return (
    <div className="choose">
      <p className="tip">Seat Select</p>
      <div className="container">
        <div className="seats">
          <div>窗</div>
          {createSeat('A')}
          {createSeat('B')}
          {createSeat('C')}
          <div>过道</div>
          {createSeat('D')}
          {createSeat('E')}
          <div>窗</div>
        </div>
      </div>
    </div>
  );
});

export default Choose;
