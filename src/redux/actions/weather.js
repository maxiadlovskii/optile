import { actionCreator, getDefaultActionsModel } from '../../services/redux/actionCreator';
import { API_URL } from '../../constants/api';
import { weatherModel } from '../../constants/models';
import { APPID } from '../../constants';
import { GET_WEATHER_DATA } from '../../constants/actions';

const defaultWeatherQuery = {
  [weatherModel.Q]: 'Munich,de',
  [weatherModel.APPID]: APPID,
  [weatherModel.CNT]: 40
};

export const getWeatherData = (query = defaultWeatherQuery) => actionCreator({
  url: `${API_URL}forecast`,
  params: {
    method: 'GET',
    query
  }
}, getDefaultActionsModel(GET_WEATHER_DATA));
