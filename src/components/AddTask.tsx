import { useState } from "react";
import { useAnalytics } from "../hooks/useAnalytics";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Button,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddTaskProps {
  onAddTask: (name: string, priority: 1 | 2 | 3 | 4) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState<1 | 2 | 3 | 4>(1);
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
    <Box sx={{ marginBottom: 2 }}>
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
        <FormControl fullWidth>
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            value={priority}
            onChange={(e) => setPriority(e.target.value as 1 | 2 | 3 | 4)}
            label="Priority"
          >
            <MenuItem value={1}>Low</MenuItem>
            <MenuItem value={2}>Medium</MenuItem>
            <MenuItem value={3}>High</MenuItem>
            <MenuItem value={4}>Urgent</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="flex-end"
        sx={{ marginTop: 2 }}
      >
        <Button
          variant="outlined"
          onClick={handleAddTask}
          sx={{
            borderColor: "#f96f65",
            ":hover": {
              borderColor: "#f96f65",
              backgroundColor: "rgba(249, 111, 101, 0.1)",
            },
          }}
        >
          <AddIcon sx={{ color: "#f96f65", marginRight: "8px" }} />
          <span style={{ color: "#A9A9A9" }}>add task</span>
        </Button>
      </Grid>
    </Box>
  );
};

export default AddTask;
