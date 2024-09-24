import { Meta, StoryFn } from "@storybook/react";
import Checkbox from "../components/shared/Checkbox";

export default {
  title: "Shared/Checkbox",
  component: Checkbox,
} as Meta;

const Template: StoryFn = (args) => <Checkbox {...args} />;

export const Unchecked = Template.bind({});
Unchecked.args = {
  completed: false,
  label: "This is an unchecked todo",
  onToggle: () => console.log("Toggled"),
};

export const Checked = Template.bind({});
Checked.args = {
  completed: true,
  label: "This is a checked todo",
  onToggle: () => console.log("Toggled"),
};
