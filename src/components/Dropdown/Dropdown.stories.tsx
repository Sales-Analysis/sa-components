import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Dropdown } from './Dropdown';

export default {
  title: 'Dropdown',
  component: Dropdown,
  argTypes: { handleChange: { action: 'selected' } },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

export const Active = Template.bind({});
Active.args = {
  active: true,
  dropdownName: 'type',
  labelText: 'Тип анализа',
  optionsArray: [
    { value: 'ABC', label: 'ABC анализ' },
    { value: 'another', label: 'Другой анализ' },
  ],
};
export const Disabled = Template.bind({});
Disabled.args = {
  active: false,
  dropdownName: 'type',
  labelText: 'Тип анализа',
  optionsArray: [
    { value: 'ABC', label: 'ABC анализ' },
    { value: 'another', label: 'Другой анализ' },
  ],
};
