import { combineReducers } from 'redux';

import weather from './weather';
import settings from './settings';

export default combineReducers({
  weather,
  settings
});
