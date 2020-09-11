import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { SetTemperature as SetTemperatureView } from '../../presentational/SetTemperature/SetTemperature';
import { setTempKey } from '../../../redux/actions/settings';

export const SetTemperature = () => {
  const { tempKey } = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const handleTempChange = useCallback(({ target: { value } }) => {
    dispatch(setTempKey(value));
  }, []);

  return <SetTemperatureView value={ tempKey } handleChange={ handleTempChange } />;
};
