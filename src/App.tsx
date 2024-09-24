import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import ToDoList from "./components/ToDoList";

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
    <div className="app p-4">
      <h1 className="text-xl mb-4">todo list example</h1>
      <AddTask onAddTask={addTask} />
      <ToDoList
        tasks={tasks}
        onToggleComplete={toggleCompleteTask}
        onDeleteTask={deleteTask}
        onEditTask={editTask}
      />
    </div>
  );
};

export default App;
