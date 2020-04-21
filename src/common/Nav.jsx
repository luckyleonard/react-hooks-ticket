import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import dayjs from 'dayjs';
import './Nav.css';

const Nav = memo(function Nav(props) {
  const { date, prev, next, isPrevDisabled, isNextDisabled } = props;

  const currentString = useMemo(() => {
    const d = dayjs(date);
    return d.format('DD/MM');
  }, [date]);

  return (
    <div className="nav">
      <span
        onClick={prev}
        className={classnames('nav-prev', {
          'nav-disabled': isPrevDisabled,
        })}
      >
        Last Day
      </span>
      <span
        onClick={next}
        className={classnames('nav-next', {
          'nav-disabled': isNextDisabled,
        })}
      >
        Next Day
      </span>
      <span className="nav-date">{currentString}</span>
    </div>
  );
});

Nav.propTypes = {
  date: PropTypes.number.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  isPrevDisabled: PropTypes.bool.isRequired,
  isNextDisabled: PropTypes.bool.isRequired,
};

export default Nav;
