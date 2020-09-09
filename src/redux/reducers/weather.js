import { GET_WEATHER_DATA } from '../../constants/actions';
import { createCollectionReducer } from '../../services/redux/reducerCreator';

export default createCollectionReducer({ ACTION: GET_WEATHER_DATA });
