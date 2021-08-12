import React from "react";
import classnames from "classnames";

import styles from "./Button.module.scss";

interface IBtnItemProps {
  text: string;
  type: 'Primary' | 'Secondary';
  className?: string;
}

export const Button = ({ className, text, type }: IBtnItemProps) => (
  <div className={classnames(styles.Button, styles[type])}>{text}</div>
);
