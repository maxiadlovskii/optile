import React from 'react';

import { FormControl, FormLabel, FormControlLabel } from '../../common/Form/Form';
import { Radio, RadioGroup } from '../../common/Radio/Radio';
import { temperatureUnit, weatherModel } from '../../../constants/models';

import { useStyles } from './SetTemperatureStyles';

export const SetTemperature = ({ value, handleChange }) => {
  const styles = useStyles();

  return (
    <article className={ styles.wrapper }>
      <FormControl component="fieldset">
        <FormLabel component="legend">Temperature</FormLabel>
        <RadioGroup row aria-label="gender" name="tempKey" value={ value } onChange={ handleChange }>
          <FormControlLabel
            value={ weatherModel.TEMP_C }
            control={ <Radio /> }
            label={ temperatureUnit[weatherModel.TEMP_C] }
          />
          <FormControlLabel
            value={ weatherModel.TEMP_F }
            control={ <Radio /> }
            label={ temperatureUnit[weatherModel.TEMP_F] }
          />
        </RadioGroup>
      </FormControl>
    </article>
  );
};
