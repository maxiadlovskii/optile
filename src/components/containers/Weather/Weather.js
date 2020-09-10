import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSwipeable } from 'react-swipeable';

import { Weather } from '../../presentational/Weather/Weather';
import { getWeatherData } from '../../../redux/actions/weather';
import { formattedWeatherList } from '../../../redux/selectors';
import { useIsMobile, useQuery } from '../../../hooks';
import { weatherModel } from '../../../constants/models';

export const WeatherContainer = () => {
  const dispatch = useDispatch();
  const { query: { [weatherModel.TEMP]: urlTemp }, addQuery } = useQuery();
  const { isMobile } = useIsMobile();
  const [ tempKey, setTempKey ] = useState(urlTemp || weatherModel.TEMP_C);
  const pageSize = useMemo(() => (isMobile ? 1 : 3), [ isMobile ]);
  const [ curIndex, setCurIndex ] = useState(0);
  const collection = useSelector(formattedWeatherList);
  const { isFetching, isSuccess, isFailed } = useSelector(
    ({ weather }) => (
      { isFetching: weather.isFetching, isSuccess: weather.isSuccess, isFailed: weather.isFailed }
    )
  );

  useEffect(() => {
    dispatch(getWeatherData());
  }, [ dispatch ]);

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

  const handleTempChange = useCallback(({ target: { value } }) => {
    addQuery({ [weatherModel.TEMP]: value });
    setTempKey(value);
  }, []);
  useEffect(() => addQuery({ i: curIndex }), [ curIndex ]);
  const curDateBarChars = useMemo(() => collection[curIndex] && collection[curIndex].barChars, [ curIndex, collection ]);
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

  console.log(pageContent);

  return (
    <Weather
      curDateBarChars={ curDateBarChars }
      pageContent={ pageContent }
      tempKey={ tempKey }
      handleTempChange={ handleTempChange }
      curDate={ curDate }
      handleBack={ handleBack }
      handleForward={ handleForward }
      showForwardButton={ showForwardButton }
      showBackButton={ showBackButton }
      handleCardClick={ handleCardClick }
      swipeHandlers={ swipeHandlers }
      isFetching={ isFetching }
      isSuccess={ isSuccess }
      isFailed={ isFailed }
    />
  );
};
