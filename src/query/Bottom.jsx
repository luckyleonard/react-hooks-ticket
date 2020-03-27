import React from 'react';
import PropTypes from 'prop-types';
import './Bottom.css';
import { ORDER_DEPART } from './constant';
import classnames from 'classnames';

export default function Bottom(props) {
  const {
    toggleOrderTypes,
    toggleHighSpeed,
    toggleOnlyTickets,
    toggleIsFiltersVisible,
    highSpeed,
    orderTyps,
    onlyTickets,
    isFiltersVisible
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
