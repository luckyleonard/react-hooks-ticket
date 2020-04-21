import React, { memo } from 'react';

// import propTypes from 'prop-types';
import classnames from 'classnames';
import './Menu.css';

const MenuItem = memo(function MenuItem(props) {
  const { onPress, title, value, active } = props;
  //active用来根据现有的乘客id得到的属性与option里的属性对比，得出是否显示选中状态
  return (
    <li className={classnames({ active })} onClick={() => onPress(value)}>
      {title}
    </li>
  );
});

const Menu = memo(function Menu(props) {
  const { show, options, onPress, hideMenu } = props;
  //show 为是否展示， options为选项内容数组， onPress是点击完以后的回调，onPress和options作为一个整体menu对象 传给Menu组件
  return (
    <div>
      {show && <div className="menu-mask" onClick={() => hideMenu()}></div>}
      <div className={classnames('menu', { show })}>
        <div className="menu-title"></div>
        <ul>
          {options &&
            options.map((option) => {
              return (
                <MenuItem
                  key={option.value}
                  {...option}
                  onPress={onPress}
                ></MenuItem>
              );
            })}
        </ul>
      </div>
    </div>
  );
});

export default Menu;
