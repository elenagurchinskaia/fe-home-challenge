import { useState, useEffect } from "react";

const priorityColors: {
  [key: number]: "gray" | "#5295f8" | "#fa9b15" | "#f96f65";
} = {
  1: "gray", // low
  2: "#5295f8", // medium
  3: "#fa9b15", // high
  4: "#f96f65", // urgent
};

import IconButton from "./shared/IconButton";
import Checkbox from "./shared/Checkbox";
import { useAnalytics } from "../hooks/useAnalytics";
import { Box, TextField } from "@mui/material";

interface ToDoItemProps {
  id: number;
  name: string;
  completed: boolean;
  priority: 1 | 2 | 3 | 4;
  onToggleComplete: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number, newName: string) => void;
  isEditing?: boolean;
}

const ToDoItem: React.FC<ToDoItemProps> = ({
  id,
  name,
  priority,
  completed,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(name);
  const { client } = useAnalytics();

  // handle the edit task with 'Enter' to save and 'esc' to cancel
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEditTask(id, editValue);
      setIsEditing(false);
      client.capture("task_edited", { id, newName: editValue });
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditValue(name);
    }
  };

  // handle saving the task when clicking outside the input
  const handleBlur = () => {
    if (isEditing) {
      onEditTask(id, editValue);
      setIsEditing(false);
    }
  };

  // mark task as completed when pressing "Enter" key outside of edit mode
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !isEditing) {
      setIsEditing(true);
    } else if (e.key === "Escape" && isEditing) {
      setIsEditing(false);
      setEditValue(name); // reset to original value on cancel
    }
  };

  const handleDeleteKeyPress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      onDeleteTask(id);
    }
  };

  useEffect(() => {
    if (isEditing) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsEditing(false);
          setEditValue(name);
        }
      };
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isEditing, name]);

  return (
    <Box
      className="todo-item"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      sx={{
        marginBottom: 4,
        borderBottom: "1px solid gray",
        paddingBottom: "10px",
      }}
      tabIndex={0}
      onKeyDown={handleKeyPress}
    >
      <Box display="flex" alignItems="center">
        <Checkbox
          checked={completed}
          onChange={() => onToggleComplete(id)}
          borderColor={priorityColors[priority]}
          tabIndex={0}
        />

        {isEditing ? (
          <TextField
            role="textbox"
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            tabIndex={0}
            size="small"
            autoFocus
            sx={{ marginLeft: 2 }}
          />
        ) : (
          <Box
            component="span"
            sx={{
              ml: 2,
              cursor: "pointer",
              textDecoration: completed ? "line-through" : "none",
            }}
            onClick={() => setIsEditing(true)}
          >
            {name}
          </Box>
        )}
      </Box>

      <IconButton
        onClick={() => onDeleteTask(id)}
        onKeyDown={handleDeleteKeyPress}
        tabIndex={0}
      />
    </Box>
  );
};

export default ToDoItem;
