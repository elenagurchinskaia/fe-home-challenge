import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import Dropdown from "./Dropdown";

export default {
  title: "Shared/Dropdown",
  component: Dropdown,
} as Meta;

const Template: StoryFn = (args) => {
  const [selectedValue, setSelectedValue] = useState(args.value || 1);

  const handlePriorityChange = (newPriority: number) => {
    setSelectedValue(newPriority);
    if (args.onChange) {
      args.onChange(newPriority);
    }
  };

  return (
    <Dropdown
      {...args}
      value={selectedValue}
      onChange={(e) => handlePriorityChange(Number(e.target.value))}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  priority: 1,
  label: "Priority",
  onChange: (priority: number) => console.log("Selected priority:", priority),
};
