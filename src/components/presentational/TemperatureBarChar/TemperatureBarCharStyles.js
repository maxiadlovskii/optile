import { makeStyles } from '@material-ui/core/styles';

import { coldTemperatureColor,
  hotTemperatureColor,
  temperatureBarCharHeight,
  mobileTemperatureBarCharHeight } from '../../../styles/muiStyleVars';
import { MIN_TEMPERATURE } from '../../../constants';

export const useStyles = makeStyles(() => ({
  wrapper: ({ isMobile }) => ({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    margin: `${isMobile ? 4 : 8}px`,
    fontSize: `${isMobile ? 12 : 14}px`
  }),
  barCharGradient: ({ isMobile }) => ({
    height: `${isMobile
      ? mobileTemperatureBarCharHeight
      : temperatureBarCharHeight}px`,
    backgroundImage: `linear-gradient(to top, ${coldTemperatureColor} 0%, ${hotTemperatureColor} 100%)`,
    width: '100%'
  }),

  barChar: ({ value, isMobile }) => ({
    height: `${(value - MIN_TEMPERATURE) / 100 * (isMobile
      ? mobileTemperatureBarCharHeight
      : temperatureBarCharHeight)}px`,
    overflow: 'hidden',
    width: isMobile ? '20px' : '50px',
    display: 'flex',
    alignItems: 'flex-end',
    borderRadius: '20px'
  }),

  barCharWrapper: ({ isMobile }) => ({
    height: `${isMobile
      ? mobileTemperatureBarCharHeight
      : temperatureBarCharHeight}px`,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center'
  })
}));
