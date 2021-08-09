import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { UploadArea } from "./UploadArea";

export default {
  title: "Upload Area/Upload Area",
  component: UploadArea,
} as ComponentMeta<typeof UploadArea>;

const Template: ComponentStory<typeof UploadArea> = (args) => (
  <UploadArea {...args} />
);

export const ExcelCSV300Mb = Template.bind({});
ExcelCSV300Mb.args = {
  acceptTypes: [".csv", ".xls"],
  sizeLimits: {
    size: 300,
    type: "Mb",
  },
};

export const WordPng100Mb = Template.bind({});
WordPng100Mb.args = {
  acceptTypes: [".doc", ".png"],
  sizeLimits: {
    size: 100,
    type: "Mb",
  },
};
