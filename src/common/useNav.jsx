import { formatDate } from './dateFormater';
import { useCallback } from 'react';

export default function useNav(departDate, dispatch, prevDate, nextDate) {
  const isPrevDisabled = formatDate(departDate) <= formatDate();

  const isNextDisabled =
    formatDate(departDate) - formatDate() > 20 * 86400 * 1000;

  const prev = useCallback(() => {
    if (isPrevDisabled) {
      return;
    }
    dispatch(prevDate());
  }, [dispatch, isPrevDisabled, prevDate]);

  const next = useCallback(() => {
    if (isNextDisabled) {
      return;
    }
    dispatch(nextDate());
  }, [dispatch, isNextDisabled, nextDate]);

  return { isPrevDisabled, isNextDisabled, prev, next };
}
