import { createSelector } from 'reselect';
import moment from 'moment';

import { weatherModel } from '../../constants/models';
import { getCelsiusTemp, getFahrenheitTemp } from '../../utils';

export const formattedWeatherList = createSelector(
  state => state.weather,
  weather => (weather.collection.list
    ? Array.from((weather.collection.list.reduce((res, {
      [weatherModel.MAIN]: { [weatherModel.TEMP]: temp },
      [weatherModel.DATE]: date
    }) => {
      const curDay = moment(date).format('DD MMM YY');
      const curHour = moment(date).format('LT');
      const hasCurDay = !!res.has(curDay);
      const curTemp = Math.round(temp);

      const curBarChar = {
        hour: curHour,
        temp_k: curTemp,
        temp_c: Math.round(getCelsiusTemp(curTemp)),
        temp_f: Math.round(getFahrenheitTemp(curTemp))
      };
      let curDayData;
      if (hasCurDay) {
        const data = res.get(curDay);
        const len = data.barChars.length;
        curDayData = {
          ...data,
          avrg_k: Math.round((data.avrg_k * len + curTemp) / (len + 1)),
          barChars: [ ...data.barChars, curBarChar ]
        };
      } else {
        curDayData = {
          avrg_k: curTemp,
          barChars: [ curBarChar ],
          date: curDay
        };
      }

      curDayData.avrg_c = Math.round(getCelsiusTemp(curDayData.avrg_k));
      curDayData.avrg_f = Math.round(getFahrenheitTemp(curDayData.avrg_k));
      res.set(curDay, curDayData);

      return res;
    }, new Map([]))).values())
    : [])
);
