import React from 'react';

import { TemperatureBarCharList } from '../TemperatureBarCharList/TemperatureBarCharList';
import { DaysList } from '../DaysList/DaysList';
import { temperatureUnit } from '../../../constants/models';
import { SetTemperature } from '../SetTemperature/SetTemperature';
import { Loader } from '../../common/Loader/Loader';
import { Failed } from '../../common/Failed/Failed';

import { useStyles } from './WeatherStyles';

export const Weather = ({
  isFetching,
  isSuccess,
  isFailed,
  curDateBarChars, pageContent, tempKey, handleTempChange, curDate,
  handleBack,
  handleForward,
  handleCardClick,
  showForwardButton,
  showBackButton,
  swipeHandlers
}) => {
  const styles = useStyles();

  if (isFailed) { return <Failed />; }
  if (isFetching && !isSuccess) { return <Loader />; }

  return (
    <section className={ styles.wrapper }>
      <SetTemperature value={ tempKey } handleChange={ handleTempChange } />
      {pageContent && (
        <DaysList
          list={ pageContent }
          tempKey={ tempKey }
          curDate={ curDate }
          handleBack={ handleBack }
          handleForward={ handleForward }
          showForwardButton={ showForwardButton }
          showBackButton={ showBackButton }
          handleCardClick={ handleCardClick }
          swipeHandlers={ swipeHandlers }
        />
)
      }
      {curDateBarChars
      && <TemperatureBarCharList list={ curDateBarChars } tempKey={ tempKey } unit={ temperatureUnit[tempKey] } />}
    </section>
  );
};
