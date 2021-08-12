import React from "react";
import { BsPlus, BsX } from "react-icons/bs";
import classNames from "classnames";

import classes from "./AccItem.module.scss";

interface IAccItemProps {
  answer: string;
  question: string;
  active: string;
  toggle: (title: string) => void;
}

export const AccItem = ({
  answer,
  question,
  active,
  toggle,
}: IAccItemProps) => {
  return (
    <li className={classes.AccItem}>
      <div className={classes.header}>
        <p className={classes.title}>{question}</p>
        <div
          className={
            active === question
              ? classNames(classes.clickedIcon, classes.icon)
              : classes.icon
          }
          onClick={() => toggle(question)}
        >
          {active === question ? (
            <BsX size="2rem" color="rgba(37, 132, 255, 1)" />
          ) : (
            <BsPlus size="2rem" />
          )}
        </div>
      </div>
      <div
        className={
          active === question
            ? classNames(classes.show, classes.content)
            : classes.content
        }
      >
        <p className={classes.content_text}>{answer}</p>
      </div>
    </li>
  );
};
