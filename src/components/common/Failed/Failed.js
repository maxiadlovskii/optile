import React from 'react';

import { useStyles } from './FailedStyles';

export const Failed = () => {
  const styles = useStyles();

  return <span className={ styles.wrapper }>Smth bad happened... :(</span>;
};
