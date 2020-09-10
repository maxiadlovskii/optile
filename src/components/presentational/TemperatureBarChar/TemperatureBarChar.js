import React from 'react';

import { useIsMobile } from '../../../hooks';

import { useStyles } from './TemperatureBarCharStyles';

export const TemperatureBarChar = ({ temperature, hour, unit, value }) => {
  const { isMobile } = useIsMobile();
  const styles = useStyles({ value, isMobile });

  return (
    <div className={ styles.wrapper }>
      <span>{ hour }</span>
      <div className={ styles.barCharWrapper }>
        <div className={ styles.barChar }>
          <div className={ styles.barCharGradient } />
        </div>
      </div>
      <span>{ `${temperature} ${unit}` }</span>
    </div>
  );
};
