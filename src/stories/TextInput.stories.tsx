import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import TextInput from "../components/shared/TextInput";

export default {
  title: "Shared/TextInput",
  component: TextInput,
} as Meta;

const Template: StoryFn = (args) => {
  const [value, setValue] = useState(args.value);

  const handleSave = (newValue: string) => {
    setValue(newValue); // update the local state
    console.log("Saved:", newValue);
  };

  const handleCancel = () => {
    console.log("Edit canceled");
  };

  return (
    <TextInput
      {...args}
      value={value}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  value: "Initial Text",
};
