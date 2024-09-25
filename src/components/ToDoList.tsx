import React from "react";
import ToDoItem from "./ToDoItem";
import { Box, Typography } from "@mui/material";

interface ToDoListProps {
  tasks: {
    id: number;
    name: string;
    priority: number;
    completed: boolean;
  }[];
  onToggleComplete: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number, newName: string) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({
  tasks,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
}) => {
  return (
    <Box className="todo-list" sx={{ mt: 4, padding: 4 }}>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <ToDoItem
            key={task.id}
            {...task}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))
      ) : (
        <Typography
          variant="body1"
          sx={{ color: "gray", textAlign: "center", mt: 4 }}
        ></Typography>
      )}
    </Box>
  );
};

export default ToDoList;
