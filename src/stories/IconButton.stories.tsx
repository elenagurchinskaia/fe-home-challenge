import { Meta, StoryFn } from "@storybook/react";
import IconButton from "../components/shared/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default {
  title: "Shared/IconButton",
  component: IconButton,
} as Meta;

const Template: StoryFn = (args) => <IconButton {...args} />;

export const Delete = Template.bind({});
Delete.args = {
  icon: <DeleteIcon />,
  onClick: () => console.log("Delete button clicked"),
};
