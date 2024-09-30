import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import ToDoList from "./components/ToDoList";
import { Grid, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#2f2f2f",
      paper: "#1c1c1c",
    },
    text: {
      primary: "#fff",
      secondary: "#B3B3B3",
    },
  },
});

interface Task {
  id: number;
  name: string;
  priority: 1 | 2 | 3 | 4;
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

  const addTask = (name: string, priority: 1 | 2 | 3 | 4) => {
    const newTask: Task = {
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

  const sortedTasks = [...tasks].sort(
    (a, b) => Number(a.completed) - Number(b.completed)
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ padding: { xs: 4, md: 8 } }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontSize: { xs: "1.5rem", md: "2rem" },
            marginBottom: { xs: 4, md: 8 },
          }}
        >
          todo list example
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={8}>
            <AddTask onAddTask={addTask} />
            <ToDoList
              tasks={sortedTasks}
              onToggleComplete={toggleCompleteTask}
              onDeleteTask={deleteTask}
              onEditTask={editTask}
              onAddTask={addTask}
            />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default App;
