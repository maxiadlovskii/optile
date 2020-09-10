import { createSelector } from 'reselect';
import moment from 'moment';

import { weatherModel } from '../../constants/models';
import { getCelsiusTemp, getFahrenheitTemp } from '../../utils';

export const formattedWeatherList = createSelector(
  state => state.weather,
  weather => (weather.collection.list
    ? Array.from(weather.collection.list.reduce((res, {
      [weatherModel.MAIN]: { [weatherModel.TEMP]: temp },
      [weatherModel.DATE]: date
    }) => {
      const curDay = moment(date).format('DD MMM YY');
      const curHour = moment(date).format('LT');
      const hasCurDay = !!res.has(curDay);
      const curTemp = temp;

      const curBarChar = {
        [weatherModel.HOUR]: curHour,
        [weatherModel.TEMP_K]: curTemp,
        [weatherModel.TEMP_C]: Math.round(getCelsiusTemp(curTemp)),
        [weatherModel.TEMP_F]: Math.round(getFahrenheitTemp(curTemp))
      };
      let curDayData;
      if (hasCurDay) {
        const data = res.get(curDay);
        const len = data.barChars.length;
        curDayData = {
          ...data,
          [weatherModel.TEMP_K]: (data[weatherModel.TEMP_K] * len + curTemp) / (len + 1),
          barChars: [ ...data.barChars, curBarChar ]
        };
      } else {
        curDayData = {
          [weatherModel.TEMP_K]: curTemp,
          barChars: [ curBarChar ],
          [weatherModel.DAY]: curDay,
          index: Array.from(res.keys()).length
        };
      }

      curDayData[weatherModel.TEMP_C] = Math.round(getCelsiusTemp(curDayData[weatherModel.TEMP_K]));
      curDayData[weatherModel.TEMP_F] = Math.round(getFahrenheitTemp(curDayData[weatherModel.TEMP_K]));

      res.set(curDay, curDayData);

      return res;
    }, new Map([])).values())
    : [])
);
