import React, { useState, useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './CitySelector.css';

export default function CitySelector(props) {
  const { show, cityData, isLoading, onBack } = props;

  const [searchValue, setSearchValue] = useState('');
  const inputValue = useMemo(() => searchValue.trim(), [searchValue]); //功能优化
  return (
    <div
      className={classnames('city-selector', {
        hidden: !show
      })}>
      <div className='city-search'>
        <div className='search-back' onClick={() => onBack()}>
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
            value={searchValue}
            className='search-input'
            placeholder='Input city name to search'
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>
        <i
          className={classnames('search-clean', {
            hidden: inputValue.length === 0
          })}
          onClick={() => setSearchValue('')}>
          &#xf063;
        </i>
      </div>
    </div>
  );
}

CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  cityData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired
};
