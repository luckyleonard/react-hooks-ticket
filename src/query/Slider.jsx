import React, { memo, useState, useMemo, useRef, useEffect } from 'react';
import './Slider.css';
import PropTypes from 'prop-types';
import leftPad from 'left-pad';
import useWinSize from '../common/useWinSize';

const Slider = memo(function Slider(props) {
  const {
    title,
    currentStartHours,
    currentEndHours,
    onStartChanged,
    onEndChanged
  } = props;

  const winSize = useWinSize();

  const startHandle = useRef();
  const endHandle = useRef();

  const lastStartX = useRef();
  const lastEndX = useRef();

  const range = useRef(); //用来测量现有滑块区域的宽度
  const rangeWidth = useRef();

  const [start, setStart] = useState(() => (currentStartHours / 24) * 100); //延迟初始化第一次初始化调用
  const [end, setEnd] = useState(() => (currentEndHours / 24) * 100);

  const prevCurrentStartHours = useRef(currentStartHours);
  const prevCurrentEndHours = useRef(currentEndHours);

  if (prevCurrentStartHours.current !== currentStartHours) {
    setStart((currentStartHours / 24) * 100);
    prevCurrentStartHours.current = currentStartHours; //记得更新ref值
  }

  if (prevCurrentEndHours.current !== currentEndHours) {
    setEnd((currentEndHours / 24) * 100);
    prevCurrentEndHours.current = currentEndHours; //记得更新ref值
  } // 存储上一次的props值用来与当前render时候的props对比进行赋值

  const startPercent = useMemo(() => {
    if (start > 100) {
      return 100;
    }
    if (start < 0) {
      return 0;
    }
    return start;
  }, [start]);

  const endPercent = useMemo(() => {
    if (end > 100) {
      return 100;
    }
    if (end < 0) {
      return 0;
    }
    return end;
  }, [end]);

  const startHours = useMemo(() => Math.round((startPercent * 24) / 100), [
    startPercent
  ]); //这里计算的是整点时间，变化只有在正数的时候才不会被round掉

  const endHours = useMemo(() => Math.round((endPercent * 24) / 100), [
    endPercent
  ]);

  const startText = useMemo(() => {
    return leftPad(startHours, 2, '0') + ':00';
  }, [startHours]);

  const endText = useMemo(() => {
    return leftPad(endHours, 2, '0') + ':00';
  }, [endHours]);

  useEffect(() => {
    rangeWidth.current = parseFloat(
      window.getComputedStyle(range.current).width
    );
  }, [winSize.width]); //一次渲染只获取一次,当屏幕尺寸变化时更新

  function onStartTouchBegin(e) {
    const touch = e.targetTouches[0];
    lastStartX.current = touch.pageX;
  }

  function onEndTouchBegin(e) {
    const touch = e.targetTouches[0];
    lastEndX.current = touch.pageX;
  }

  function onStartTouchMove(e) {
    const touch = e.targetTouches[0];
    const distance = touch.pageX - lastStartX.current;
    lastStartX.current = touch.pageX; //更新现在的滑块位置
    setStart(start => start + (distance / rangeWidth.current) * 100); //根据滑动距离触发重渲染,这里计算的是移动的百分比
  }

  function onEndTouchMove(e) {
    const touch = e.targetTouches[0];
    const distance = touch.pageX - lastEndX.current;
    lastEndX.current = touch.pageX; //更新现在的滑块位置
    setEnd(end => end + (distance / rangeWidth.current) * 100); //根据滑动距离触发重渲染
  }

  useEffect(() => {
    startHandle.current.addEventListener(
      'touchstart',
      onStartTouchBegin,
      false
    );
    startHandle.current.addEventListener('touchmove', onStartTouchMove, false);
    endHandle.current.addEventListener('touchstart', onEndTouchBegin, false);
    endHandle.current.addEventListener('touchmove', onEndTouchMove, false);

    return () => {
      startHandle.current.removeEventListener(
        'touchstart',
        onStartTouchBegin,
        false
      );
      startHandle.current.removeEventListener(
        'touchmove',
        onStartTouchMove,
        false
      );
      endHandle.current.removeEventListener(
        'touchstart',
        onEndTouchBegin,
        false
      );
      endHandle.current.removeEventListener('touchmove', onEndTouchMove, false);
    };
  });

  useEffect(() => {
    onStartChanged(startHours);
  }, [startHours]);

  useEffect(() => {
    onEndChanged(endHours);
  }, [endHours]);

  return (
    <div className='option'>
      <h3>{title}</h3>
      <div className='range-slider'>
        <div className='slider' ref={range}>
          <div
            className='slider-range'
            style={{
              left: startPercent + '%',
              width: endPercent - startPercent + '%'
            }}></div>
          <i
            ref={startHandle}
            className='slider-handle'
            style={{
              left: startPercent + '%'
            }}>
            <span>{startText}</span>
          </i>
          <i
            ref={endHandle}
            className='slider-handle'
            style={{
              left: endPercent + '%'
            }}>
            <span>{endText}</span>
          </i>
        </div>
      </div>
    </div>
  );
});

Slider.propTypes = {
  title: PropTypes.string.isRequired,
  currentStartHours: PropTypes.number.isRequired,
  currentEndHours: PropTypes.number.isRequired,
  onStartChanged: PropTypes.func.isRequired,
  onEndChanged: PropTypes.func.isRequired
};

export default Slider;
