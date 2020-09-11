import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { TemperatureBarCharList
as TemperatureBarCharListView } from '../../presentational/TemperatureBarCharList/TemperatureBarCharList';
import { formattedWeatherList } from '../../../redux/selectors';
import { temperatureUnit } from '../../../constants/models';
import { useQuery } from '../../../hooks';

export const TemperatureBarCharList = () => {
  const collection = useSelector(formattedWeatherList);
  const { tempKey } = useSelector(state => state.settings);
  const { query: { i: curIndex } } = useQuery();

  const curDateBarChars = useMemo(
    () => (collection[curIndex] ? collection[curIndex].barChars : []), [ curIndex, collection ]
  );

  return (
    <TemperatureBarCharListView
      tempKey={ tempKey }
      list={ curDateBarChars }
      curIndex={ curIndex }
      unit={ temperatureUnit[tempKey] }
    />
  );
};
