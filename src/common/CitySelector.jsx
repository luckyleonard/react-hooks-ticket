import React, { useState, useMemo, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './CitySelector.css';

function CityItem(props) {
  const { name, onSelect } = props;
  return (
    <li className='city-li' onClick={() => onSelect(name)}>
      {name}
    </li>
  );
}

function CitySection(props) {
  const { title, cities = [], onSelect } = props;
  return (
    <ul className='city-ui'>
      <li className='city-li' key='title'>
        {title}
      </li>
      {cities.map(city => {
        return (
          <CityItem key={city.name} name={city.name} onSelect={onSelect} />
        );
      })}
    </ul>
  );
}

function CityList(props) {
  const { sections, onSelect } = props;

  return (
    <div className='city-list'>
      <div className='city-cate'>
        {sections.map(section => {
          return (
            <CitySection
              key={section.title}
              title={section.title}
              cities={section.citys}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function CitySelector(props) {
  const { show, cityData, isLoading, onBack, onSelect, fetchCityData } = props;

  const [searchValue, setSearchValue] = useState('');
  const inputValue = useMemo(() => searchValue.trim(), [searchValue]); //功能优化

  useEffect(() => {
    if (!show || cityData || isLoading) {
      return;
    }
    fetchCityData();
  }, [show, cityData, isLoading]); //在需要展示且没有cityData和并没有在loading状态下调用请求函数

  const outputCitySections = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (cityData) {
      return <CityList sections={cityData.cityList} onSelect={onSelect} />;
    }

    return <div>Oops..there is an error</div>;
  }; //在有cityData数据时候再显示CityList组件

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
      {outputCitySections()}
    </div>
  );
}

CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  cityData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  fetchCityData: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};
