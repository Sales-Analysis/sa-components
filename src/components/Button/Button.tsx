import React from 'react';
import classnames from 'classnames';

import styles from './Button.module.css';

interface IProps {
  text: string;
  className?: string;
}

export const Button = ({className, text}: IProps) => (
  <div className={classnames(styles.Button, className)}>{text}</div>
);
