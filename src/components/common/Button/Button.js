import React from 'react';
import classNames from 'classnames';
import { Button as MUButton } from '@material-ui/core';

import { additionsClasses } from '../../../utils';

import styles from './Button.module.scss';

export const Button = ({ onClick, children, color, additions = [] }) => (
  <MUButton
    color={ color }
    className={ classNames(styles.button, additionsClasses(additions, styles)) }
    onClick={ onClick }
  >
    {children}
  </MUButton>
);
