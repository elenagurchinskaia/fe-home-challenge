import React from "react";
import { Checkbox as MUICheckbox } from "@mui/material";

interface CheckboxProps {
  completed: boolean;
  onToggle: () => void;
  priority: number;
  tabIndex?: number;
}

const priorityColors = {
  1: "gray", // low
  2: "#5295f8", // medium
  3: "#fa9b15", // high
  4: "#f96f65", // urgent
};

const Checkbox: React.FC<CheckboxProps> = ({
  completed,
  onToggle,
  priority,
}) => {
  const priorityColor =
    priorityColors[priority as keyof typeof priorityColors] || "gray";
  return (
    <MUICheckbox
      checked={completed}
      onChange={onToggle}
      sx={{
        color: priorityColor,
        "&.Mui-checked": {
          color: priorityColor,
        },
        borderRadius: "50%",
        padding: "4px",
        "&:hover": {
          backgroundColor: `${priorityColor}20`,
        },
      }}
    />
  );
};

export default Checkbox;
