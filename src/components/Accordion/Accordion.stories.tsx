import React from "react";
import { Meta } from "@storybook/react";
import faker from "faker";
import { Accordion } from "./Accordion";
faker.locale = "ru";

export default {
  title: "Accordion/Accordion",
  component: Accordion,
} as Meta;

export const component = () => {
  return <Accordion items={items} />;
};

/// Данные
let getRandomNumberRange = function (min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
};

let newObj = () => ({
  question: `${faker.company.catchPhrase()}?`,
  answer: faker.lorem.paragraph(),
});

let newArr = Array.from({ length: getRandomNumberRange(1, 10) }).map((_) =>
  newObj()
);

const items = newArr;
