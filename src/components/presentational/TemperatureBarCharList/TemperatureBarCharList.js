import React from 'react';

import { TemperatureBarChar } from '../TemperatureBarChar/TemperatureBarChar';
import { weatherModel } from '../../../constants/models';

import { useStyles } from './TemperatureBarCharListStyles';

export const TemperatureBarCharList = ({ list, tempKey = 'tempC', unit = 'C' }) => {
  const styles = useStyles();
  console.log(list);

  return (
    <article className={ styles.wrapper }>
      { list
        .map(({
                [weatherModel.TEMP_K]: tempK, [tempKey]: temperature, [weatherModel.HOUR]: hour
        }) => (
          <TemperatureBarChar
            key={ hour }
            value={ tempK }
            temperature={ temperature }
            unit={ unit }
            hour={ hour }
          />
))}
    </article>
  );
};
