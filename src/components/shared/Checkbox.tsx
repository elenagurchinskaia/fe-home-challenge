import React from "react";
import {
  Checkbox as MUICheckbox,
  CheckboxProps as MUICheckboxProps,
} from "@mui/material";

interface CheckboxProps extends MUICheckboxProps {
  borderColor?: (typeof priorityColors)[keyof typeof priorityColors];
}

const priorityColors = {
  1: "gray", // low
  2: "#5295f8", // medium
  3: "#fa9b15", // high
  4: "#f96f65", // urgent
} as const;

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { checked, onChange, borderColor = "gray" } = props;
  return (
    <MUICheckbox
      checked={checked}
      onChange={onChange}
      sx={{
        color: borderColor,
        "&.Mui-checked": {
          color: borderColor,
        },
        borderRadius: "50%",
        padding: "4px",
        "&:hover": {
          backgroundColor: `${borderColor}20`,
        },
      }}
    />
  );
};

export default Checkbox;
