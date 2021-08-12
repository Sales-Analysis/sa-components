import React, { useState } from "react";
import { AccItem } from "./AccItem/AccItem";

interface IAccordionProps {
  items: { id?: number; question: string; answer: string }[];
}

export const Accordion = ({ items }: IAccordionProps) => {
  const [active, setActive] = useState("");

  const toggle = (title: string) => {
    if (title === active) {
      setActive("");
    } else {
      setActive(title);
    }
  };

  return (
    <ul className="Accordion">
      {items.map((item) => {
        return (
          <AccItem
            key={`${item.question}-id`}
            question={item.question}
            answer={item.answer}
            active={active}
            toggle={toggle}
          />
        );
      })}
    </ul>
  );
};
