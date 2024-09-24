import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import Dropdown from "../components/shared/Dropdown";

export default {
  title: "Shared/Dropdown",
  component: Dropdown,
} as Meta;

const Template: StoryFn = (args) => {
  const [priority, setPriority] = useState(args.priority);

  const handlePriorityChange = (newPriority: number) => {
    setPriority(newPriority);
    args.onChange(newPriority);
  };

  return (
    <Dropdown {...args} priority={priority} onChange={handlePriorityChange} />
  );
};

export const Default = Template.bind({});
Default.args = {
  priority: 1,
  onChange: (priority: number) => console.log("Selected priority:", priority),
};
