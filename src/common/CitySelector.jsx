import React from 'react';
import classnames from 'classnames';
import './CitySelector.css';

export default function CitySelector(props) {
  const { show, cityData, isLoading } = props;

  return (
    <div
      className={classnames('city-selector', {
        hidden: !show
      })}>
      <div className='city-search'>
        <div className='search-back'>
          <svg width='42' height='42'>
            <polyline
              points='25,13 16,21 25,29'
              stroke='#fff'
              strokeWidth='2'
              fill='none'
            />
          </svg>
        </div>
        <div className='search-input-wrapper'>
          <input
            type='text'
            value=''
            className='search-input'
            placeholder='Pick one city'
          />
        </div>
        <i className='search-clean'>&#xf063;</i>
      </div>
    </div>
  );
}
