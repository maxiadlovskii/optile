export const weatherModel = {
  Q: 'q',
  APPID: 'APPID',
  CNT: 'cnt',
  DATE: 'dt_txt',
  MAIN: 'main',
  TEMP: 'temp',
  TEMP_C: 'tempC',
  TEMP_K: 'tempK',
  TEMP_F: 'tempF',
  HOUR: 'hour',
  DAY: 'day'
};

export const temperatureUnit = {
  [weatherModel.TEMP_K]: 'K',
  [weatherModel.TEMP_C]: 'C',
  [weatherModel.TEMP_F]: 'F'
};
