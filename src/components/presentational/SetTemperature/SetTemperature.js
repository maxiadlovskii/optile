import React from 'react';

import { FormControl, FormControlLabel } from '../../common/Form/Form';
import { Radio, RadioGroup } from '../../common/Radio/Radio';
import { weatherModel } from '../../../constants/models';

import { useStyles } from './SetTemperatureStyles';

export const SetTemperature = ({ value, handleChange }) => {
  const styles = useStyles();

  return (
    <article className={ styles.wrapper }>
      <FormControl component="fieldset">
        <RadioGroup row aria-label="gender" name="tempKey" value={ value } onChange={ handleChange }>
          <FormControlLabel
            value={ weatherModel.TEMP_C }
            control={ <Radio /> }
            label="Celcius"
          />
          <FormControlLabel
            value={ weatherModel.TEMP_F }
            control={ <Radio /> }
            label="Fahrenheit"
          />
        </RadioGroup>
      </FormControl>
    </article>
  );
};
