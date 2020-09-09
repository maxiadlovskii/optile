import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Weather } from '../../presentational/Weather/Weather';
import { getWeatherData } from '../../../redux/actions/weather';
import { formattedWeatherList } from '../../../redux/selectors';

export const WeatherContainer = () => {
  const dispatch = useDispatch();
  const list = useSelector(formattedWeatherList);
  console.log(list);
  useEffect(() => {
    dispatch(getWeatherData());
  }, [ dispatch ]);

  return <Weather />;
};
