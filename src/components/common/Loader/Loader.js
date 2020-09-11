import React from 'react';

import { useStyles } from './LoaderStyles';

export const Loader = () => {
  const styles = useStyles();

  return <span className={ styles.wrapper }>'Loading...'</span>;
};
