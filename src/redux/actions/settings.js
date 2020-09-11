import { SET_TEMP_KEY } from '../../constants/actions';

export const setTempKey = tempKey => ({
  type: SET_TEMP_KEY,
  payload: tempKey
});
