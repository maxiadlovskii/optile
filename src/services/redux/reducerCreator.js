import { FAILED, REQUEST, SUCCESS, CLEAR_ALL, CLEAR_ERROR } from '../../constants/actions';

const defaultCollectionInitialState = {
  errors: {},
  collection: {},
  isFetching: false,
  isFailed: false,
  isSuccess: false
};

const defaultErrorsMapper = response => response;
const defaultCollectionMapper = response => response;

export const createCollectionReducer = ({
  ACTION,
  initState = defaultCollectionInitialState,
  errorsMapper = defaultErrorsMapper,
  collectionMapper = defaultCollectionMapper,
  extensions = {}
}) => (
  state = initState,
  action
) => {
  const { type, payload, extraData } = action;
  const types = {
    [`${ACTION}${REQUEST}`]: () => ({
      ...state,
      isFetching: true,
      isFailed: false,
      errors: {}
    }),
    [`${ACTION}${SUCCESS}`]: ({ payload: actionPayload, state: actionState }) => ({
      ...actionState,
      isFetching: false,
      isSuccess: true,
      collection: collectionMapper(actionPayload)
    }),
    [`${ACTION}${FAILED}`]: ({ payload: actionPayload, state: actionState }) => ({
      ...actionState,
      isFetching: false,
      isFailed: true,
      errors: errorsMapper(actionPayload)
    }),
    [`${ACTION}${CLEAR_ALL}`]: () => ({
      ...initState
    }),
    [`${ACTION}${CLEAR_ERROR}`]: () => ({
      ...state,
      isFetching: false,
      isFailed: false,
      errors: {}
    }),
    ...extensions
  };

  return types[type] ? types[type]({ type, payload, extraData, state }) : state;
};

