import { useState } from "react";
import { useAnalytics } from "../hooks/useAnalytics";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddTaskProps {
  onAddTask: (name: string, priority: number) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState(1);
  const { client } = useAnalytics();

  const handleAddTask = () => {
    if (taskName.trim()) {
      onAddTask(taskName, priority);

      // capture analytics event
      client.capture("task_created", { taskName, priority });
      setTaskName("");
      setPriority(1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTask();
    } else if (e.key === "Escape") {
      setTaskName("");
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" mb={4}>
      <IconButton
        sx={{
          color: "red",
          display: "flex",
          alignItems: "center",
          fontSize: "1rem",
          "&:hover": { backgroundColor: "transparent" },
        }}
        onClick={handleAddTask}
      >
        <AddIcon sx={{ color: "#f96f65", marginRight: "8px" }} />
        <span style={{ color: "#A9A9A9", textTransform: "lowercase" }}>
          Add task
        </span>
      </IconButton>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        mt={2}
      >
        <TextField
          type="text"
          label="New Task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
          sx={{ mb: { xs: 2, md: 0 }, mr: { md: 2 } }}
        />
        <FormControl
          sx={{ minWidth: 120, mb: { xs: 2, md: 0 }, mr: { md: 2 } }}
          size="small"
        >
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            label="Priority"
          >
            <MenuItem value={1}>Low</MenuItem>
            <MenuItem value={2}>Medium</MenuItem>
            <MenuItem value={3}>High</MenuItem>
            <MenuItem value={4}>Urgent</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default AddTask;
