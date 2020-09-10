import React from 'react';
import classnames from 'classnames';

import { Card, CardContent } from '../../common/Card/Card';
import { Typography } from '../../common/Typografy/Typography';
import { temperatureUnit, weatherModel } from '../../../constants/models';
import { ArrowBackIosIcon, ArrowForwardIosIcon } from '../../common/Icons/Icons';
import { useIsMobile } from '../../../hooks';

import { useStyles } from './DaysListStyles';


export const DaysList = ({ list, curDate, tempKey, handleBack,
  handleForward,
  showForwardButton,
  showBackButton, handleCardClick,
  swipeHandlers }) => {
  const styles = useStyles();
  const { isMobile } = useIsMobile();

  return (
    <article className={ styles.wrapper } { ...swipeHandlers }>
      <div className={ styles.control }>
        {showBackButton && <ArrowBackIosIcon onClick={ handleBack } />}
      </div>
      {
     list.map(({ [weatherModel.DAY]: date, [tempKey]: temperature, index }) => {
       const isActive = date === curDate;

       return (
         <Card
           key={ date }
           onClick={ () => handleCardClick(index) }
           className={ classnames(styles.card, {
           [styles.isActive]: isActive,
           [styles.isMobile]: isMobile
         })
         }
         >
           <CardContent className={ styles.cardContent }>
             {!isActive && <div className={ styles.blur } />}
             <Typography variant="subtitle1" color="textSecondary" gutterBottom>
               Date:
             </Typography>
             <Typography variant="h5" gutterBottom>
               { date }
             </Typography>
             <Typography variant="subtitle1" color="textSecondary" gutterBottom>
               Temperature:
             </Typography>
             <Typography variant="h5" component="h2">
               {`${temperature} ${temperatureUnit[tempKey]}`}
             </Typography>
           </CardContent>
         </Card>
       );
     })
   }
      <div className={ styles.control }>
        {showForwardButton && <ArrowForwardIosIcon onClick={ handleForward } />}
      </div>
    </article>
  );
};
