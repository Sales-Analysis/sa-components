import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Dropdown } from "./Dropdown";

export default {
  title: "Example/Dropdown",
  component: Dropdown,
  argTypes: { handleChange: { action: "selected" } },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

export const Default = Template.bind({});
Default.args = {
  active: true,
  dropdownName: "type",
  labelText: "Тип анализа",
  optionsArray: [
    { value: "ABC", label: "ABC анализ" },
    { value: "another", label: "Другой анализ" },
  ]
};
