import { useState } from "react";
import { useAnalytics } from "../hooks/useAnalytics";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

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
    <div className="add-task">
      <TextField
        type="text"
        label="New Task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="p-2 border rounded"
        fullWidth
        sx={{ marginBottom: "1rem" }}
      />
      <FormControl sx={{ minWidth: 120, marginRight: "1rem" }} size="small">
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select
          labelId="priority-label"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              document.getElementById("add-task-btn")?.focus();
            }
          }}
          label="Priority"
        >
          <MenuItem value={1}>Low</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>High</MenuItem>
          <MenuItem value={4}>Urgent</MenuItem>
        </Select>
      </FormControl>
      <Button
        id="add-task-btn"
        onClick={handleAddTask}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        variant="contained"
        color="primary"
        sx={{ height: "40px" }}
      >
        Add Task
      </Button>
    </div>
  );
};

export default AddTask;
