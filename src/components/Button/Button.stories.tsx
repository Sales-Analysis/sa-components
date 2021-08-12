import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "./Button";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = { type: "Primary", text: "Начать анализ" };

export const Secondary = Template.bind({});
Secondary.args = { type: "Secondary", text: "Начать анализ" };
