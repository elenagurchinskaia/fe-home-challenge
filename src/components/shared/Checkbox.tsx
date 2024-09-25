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
  2: "blue", // medium
  3: "orange", // high
  4: "red", // urgent
};

const Checkbox: React.FC<CheckboxProps> = ({
  completed,
  onToggle,
  priority,
}) => {
  const priorityColor =
    priorityColors[priority as keyof typeof priorityColors] || "gray";
  return (
    <div className="flex items-center">
      {
        <MUICheckbox
          checked={completed}
          onChange={onToggle}
          sx={{
            color: priorityColor,
            "&.Mui-checked": {
              color: priorityColor,
            },
            borderRadius: "50%",
          }}
        />
      }
    </div>
  );
};

export default Checkbox;
