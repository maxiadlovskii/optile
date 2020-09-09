import { FAILED, REQUEST, SUCCESS } from '../../constants/actions';
import { transportService as getServerData } from '../transport';

export const getDefaultActionsModel = actionConstant => ({
  REQUEST: `${actionConstant}${REQUEST}`,
  SUCCESS: `${actionConstant}${SUCCESS}`,
  FAILURE: `${actionConstant}${FAILED}`
});
const requestAction = (REQUEST_ACTION, extraData) => ({
  type: REQUEST_ACTION,
  extraData
});

const requestFailure = (FAILURE_ACTION, responseObject) => ({
  type: FAILURE_ACTION,
  payload: responseObject.response,
  extraData: responseObject.extraData,
  request: responseObject.request
});

const requestSuccess = (SUCCESS_ACTION, responseObject) => ({
  type: SUCCESS_ACTION,
  payload: responseObject.response,
  extraData: responseObject.extraData
});

const dispatcher = async(options, actionConstants, dispatch) => {
  const { extraData, callBacks = {}, asyncAction } = options;
  dispatch(requestAction(actionConstants.REQUEST, extraData));
  callBacks.REQUEST && (await callBacks.REQUEST({ options }));
  try {
    const response = await asyncAction();
    dispatch(
      requestSuccess(
        actionConstants.SUCCESS,
        { response, extraData }
      )
    );
    callBacks.SUCCESS && callBacks.SUCCESS({ response, dispatch });
  } catch (e) {
    dispatch(
      requestFailure(actionConstants.FAILURE, {
        response: e,
        extraData
      })
    );
    callBacks.FAILURE && (await callBacks.FAILURE({ response: e }));
  }
};

export const actionCreator = (options, actionConstants) => dispatch => {
  const { url, params, ...restOptions } = options;

  return dispatcher(
    {
      ...restOptions,
      asyncAction: async() => getServerData(url, params)
    },
    actionConstants,
    dispatch
  );
};
