import { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";

interface DropdownProps {
  priority: number;
  onChange: (priority: number) => void;
}

const priorityOptions = [
  { label: "Urgent", value: 1, color: "red" },
  { label: "High", value: 2, color: "orange" },
  { label: "Medium", value: 3, color: "yellow" },
  { label: "Low", value: 4, color: "gray" },
];

const Dropdown: React.FC<DropdownProps> = ({ priority, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(priority);

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const value = Number(event.target.value);
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select
          labelId="priority-label"
          id="priority-select"
          value={selectedOption}
          onChange={handleSelectChange}
          label="Priority"
          sx={{
            bgcolor: "white",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        >
          {priorityOptions.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ color: option.color }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
