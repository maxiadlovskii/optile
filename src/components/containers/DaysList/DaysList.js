import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSwipeable } from 'react-swipeable';

import { DaysList as DaysListView } from '../../presentational/DaysList/DaysList';
import { weatherModel } from '../../../constants/models';
import { useIsMobile, useQuery } from '../../../hooks';
import { formattedWeatherList } from '../../../redux/selectors';


export const DaysList = () => {
  const { isMobile } = useIsMobile();
  const { query: { i: urlIndex }, addQuery } = useQuery();
  const { tempKey } = useSelector(state => state.settings);
  const pageSize = useMemo(() => (isMobile ? 1 : 3), [ isMobile ]);
  const [ curIndex, setCurIndex ] = useState(Number(urlIndex) || 0);
  const collection = useSelector(formattedWeatherList);

  const pageContent = useMemo(() => {
    if (!collection) { return []; }
    const firstIndexCandidate = curIndex - Math.floor((pageSize - 1) / 2);
    let firstIndex = firstIndexCandidate < 0 ? 0 : firstIndexCandidate;
    const lastIndexCandidate = pageSize + firstIndex;
    const lastIndex = lastIndexCandidate > collection.length ? collection.length : lastIndexCandidate;
    const delta = pageSize - (lastIndex - firstIndex);
    if (delta > 0) {
      firstIndex = firstIndex - delta;
    }

    return collection.slice(firstIndex, lastIndex);

  }, [ pageSize, collection, curIndex ]);

  useEffect(() => addQuery({ i: curIndex }), [ curIndex, addQuery ]);
  const curDate = useMemo(() =>
    collection[curIndex] && collection[curIndex][weatherModel.DAY], [ curIndex, collection ]);
  const showForwardButton = useMemo(() => curIndex !== collection.length - 1, [ collection, curIndex ]);
  const showBackButton = useMemo(() => curIndex !== 0, [ curIndex ]);

  const handleBack = useCallback(
    () => showBackButton && setCurIndex(curIndex - 1), [ curIndex, setCurIndex, showBackButton ]
  );
  const handleCardClick = useCallback(
    index => setCurIndex(index), [ setCurIndex ]
  );
  const handleForward = useCallback(
    () => showForwardButton && setCurIndex(curIndex + 1), [ curIndex, setCurIndex, showForwardButton ]
  );

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleForward,
    onSwipedRight: handleBack
  });

  return (
    <DaysListView
      list={ pageContent }
      tempKey={ tempKey }
      curDate={ curDate }
      handleBack={ handleBack }
      handleForward={ handleForward }
      showForwardButton={ showForwardButton }
      showBackButton={ showBackButton }
      handleCardClick={ handleCardClick }
      swipeHandlers={ swipeHandlers }
    />
  );
};
