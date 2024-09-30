import { Meta, StoryFn } from "@storybook/react";
import Checkbox from "./Checkbox";

export default {
  title: "Shared/Checkbox",
  component: Checkbox,
} as Meta;

const Template: StoryFn = (args) => <Checkbox {...args} />;

export const Unchecked = Template.bind({});
Unchecked.args = {
  completed: false,
  onChange: () => console.log("Unchecked toggled"),
  borderColor: "gray",
};

export const Checked = Template.bind({});
Checked.args = {
  completed: true,
  onChange: () => console.log("Checked toggled"),
  borderColor: "#fa9b15",
};
