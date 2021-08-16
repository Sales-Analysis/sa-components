import React from 'react';
import classnames from 'classnames';

import styles from './DropdownList.module.css';

interface IDropdownItemProps {
  className?: string;
}

export const DropdownList = ({ className }: IDropdownItemProps) => (
  <div className={classnames(styles.root, className)} />
);
