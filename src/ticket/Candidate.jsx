import React, { memo, useState, useCallback, useMemo, useContext } from 'react';
import URI from 'urijs';
import dayjs from 'dayjs';
import { TrainContext } from './context';
// import propTypes from 'prop-types';
import './Candidate.css';

const Channel = memo(function Channel(props) {
  const { name, desc, type } = props;

  const { trainNumber, departStation, arriveStation, departDate } = useContext(
    TrainContext
  );

  const src = useMemo(() => {
    return new URI('order.html')
      .setSearch('trainNumber', trainNumber)
      .setSearch('dStation', departStation)
      .setSearch('aStation', arriveStation)
      .setSearch('type', type)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .toString(); //大部分数据都在redux库内，使用context进行传递
  }, [type, trainNumber, departStation, arriveStation, departDate]);

  return (
    <div className="channel">
      <div className="middle">
        <div className="name">{name}</div>
        <div className="desc">{desc}</div>
      </div>
      <a href={src} className="buy-wrapper">
        <div className="buy">Booking</div>
      </a>
    </div>
  );
});

const Seat = memo(function Seat(props) {
  const {
    type,
    priceMsg,
    ticketsLeft,
    channels,
    expanded,
    onToggle,
    index,
  } = props;
  return (
    <li>
      <div className="bar" onClick={() => onToggle(index)}>
        <span className="seat">{type}</span>
        <span className="price">
          <i>$</i>
          {priceMsg}
        </span>
        <span className="btn">{expanded ? '预订' : '收起'}</span>
        <span className="num">{ticketsLeft}</span>
      </div>
      <div
        className="channels"
        style={{ height: expanded ? channels.length * 55 + 'px' : 0 }}
      >
        {channels.map((channel) => {
          return <Channel key={channel.name} {...channel} type={type} />;
        })}
      </div>
    </li>
  );
});

const Candidate = memo(function Candidate(props) {
  const { tickets } = props;

  const [expandedIndex, setExpandedIndex] = useState(-1);

  const onToggle = useCallback(
    (index) => {
      setExpandedIndex(index === expandedIndex ? -1 : index);
    },
    [expandedIndex]
  );

  return (
    <div className="candidate">
      <ul>
        {tickets.map((ticket, index) => {
          return (
            <Seat
              expanded={expandedIndex === index}
              onToggle={onToggle}
              index={index}
              {...ticket}
              key={ticket.type}
            />
          );
        })}
      </ul>
    </div>
  );
});

Candidate.propTypes = {};

export default Candidate;
