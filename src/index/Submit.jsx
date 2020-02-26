import React, { memo } from 'react';
import './Submit.css';

export default memo(function Submit() {
  return (
    <div className='submit'>
      <button type='submit' className='submit-button'>
        Search
      </button>
    </div>
  );
});
