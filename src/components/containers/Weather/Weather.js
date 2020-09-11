import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Weather } from '../../presentational/Weather/Weather';
import { getWeatherData } from '../../../redux/actions/weather';

export const WeatherContainer = () => {
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isFailed } = useSelector(
    ({ weather }) => (
      { isFetching: weather.isFetching, isSuccess: weather.isSuccess, isFailed: weather.isFailed }
    )
  );

  useEffect(() => {
    dispatch(getWeatherData());
  }, [ dispatch ]);

  return (
    <Weather
      isFetching={ isFetching }
      isSuccess={ isSuccess }
      isFailed={ isFailed }
    />
  );
};
