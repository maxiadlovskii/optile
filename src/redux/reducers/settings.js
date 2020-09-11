import { weatherModel } from '../../constants/models';
import { SET_TEMP_KEY } from '../../constants/actions';

const initState = {
  tempKey: weatherModel.TEMP_C
};

export default (
  state = initState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case SET_TEMP_KEY:
      return ({
        ...state,
        tempKey: payload
      });
    default:
      return state;
  }
};
