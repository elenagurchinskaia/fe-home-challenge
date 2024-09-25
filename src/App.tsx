import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import ToDoList from "./components/ToDoList";
import { Grid, Typography } from "@mui/material";

interface Task {
  id: number;
  name: string;
  priority: number;
  completed: boolean;
}

const App: React.FC = () => {
  // retrieve tasks from localStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("todoTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (name: string, priority: number) => {
    const newTask = {
      id: Date.now(),
      name,
      priority,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleCompleteTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const editTask = (id: number, newName: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, name: newName } : task
      )
    );
  };

  return (
    <Grid container spacing={2} sx={{ padding: { xs: "1rem", md: "2rem" } }}>
      <Grid item xs={12} md={8}>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "1.5rem", md: "2rem" },
            marginBottom: { xs: "1rem", md: "2rem" },
          }}
        >
          todo list example
        </Typography>
        <AddTask onAddTask={addTask} />
        <ToDoList
          tasks={tasks}
          onToggleComplete={toggleCompleteTask}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            marginBottom: { xs: "0.5rem", md: "1rem" },
          }}
        ></Typography>
      </Grid>
    </Grid>
  );
};

export default App;
