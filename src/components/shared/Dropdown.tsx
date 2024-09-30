import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectProps as MUISelectProps,
  SelectChangeEvent,
} from "@mui/material";

interface DropdownProps extends Omit<MUISelectProps, "value"> {
  borderColor?: string;
  label?: string;
  value: any;
  onChange: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void;
}

const priorityOptions = [
  { label: "Low", value: 1, color: "gray" },
  { label: "Medium", value: 2, color: "#5295f8" },
  { label: "High", value: 3, color: "#fa9b15" },
  { label: "Urgent", value: 4, color: "#f96f65" },
] as const;

const Dropdown: React.FC<DropdownProps> = ({
  borderColor = "gray",
  ...props
}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="dropdown-label">{props.label}</InputLabel>
        <Select
          labelId="priority-label"
          {...props}
          sx={{
            bgcolor: "red",
            "& .MuiOutlinedInput-root": {
              borderColor: borderColor,
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
