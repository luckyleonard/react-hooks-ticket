import React, { memo, useState } from 'react';

import propTypes from 'prop-types';
import classnames from 'classnames';
import './Account.css';

const Account = memo(function Account(props) {
  const { price = 0, length } = props;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="account">
      <div
        className={classnames('price', { expanded })}
        onClick={() => setExpanded(!expanded)}
      >
        {/* 更改小箭头方向 */}
        <div className="money">{length * price}</div>
        <div className="amount">Bill Summary</div>
      </div>
      <div className="button">Place Order</div>
      <div
        className={classnames('layer', { hidden: !expanded })}
        onClick={() => setExpanded(false)}
      ></div>
      <div className={classnames('detail', { hidden: !expanded })}>
        <div className="title">Bill Detail</div>
        <ul>
          <li>
            <span>Ticket</span>
            <span>${price}</span>
            <span>&#xD7;{length}</span>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default Account;
