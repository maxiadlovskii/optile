import React from 'react';

import { TemperatureBarCharList } from '../../containers/TemperatureBarCharList/TemperatureBarCharList';
import { DaysList } from '../../containers/DaysList/DaysList';
import { SetTemperature } from '../../containers/SetTemperature/SetTemperature';
import { Loader } from '../../common/Loader/Loader';
import { Failed } from '../../common/Failed/Failed';

import { useStyles } from './WeatherStyles';

export const Weather = ({
  isFetching,
  isSuccess,
  isFailed
}) => {
  const styles = useStyles();

  if (isFailed) { return <Failed />; }
  if (isFetching && !isSuccess) { return <Loader />; }

  return (
    <section className={ styles.wrapper }>
      <SetTemperature />
      <DaysList />
      <TemperatureBarCharList />
    </section>
  );
};
