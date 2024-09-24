import React from "react";
import ToDoItem from "./ToDoItem";

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
    <div className="todo-list">
      {tasks.map((task) => (
        <ToDoItem
          key={task.id}
          {...task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
};

export default ToDoList;
