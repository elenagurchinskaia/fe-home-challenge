import { useState, useEffect } from "react";
import IconButton from "./shared/IconButton";
import { useAnalytics } from "../hooks/useAnalytics";

interface ToDoItemProps {
  id: number;
  name: string;
  priority: number;
  completed: boolean;
  onToggleComplete: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number, newName: string) => void;
}

const priorityColors = {
  1: "border-gray-500 text-gray-500", // low
  2: "border-blue-500 text-blue-500", // medium
  3: "border-orange-500 text-orange-500", // high
  4: "border-red-500 text-red-500", // urgent
};

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
    if (!isEditing && e.key === "Enter") {
      onToggleComplete(id);
      // capture analytics event
      client.capture("task_marked", { id, name, completed: !completed });
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
    <div
      className="todo-item flex justify-between items-center p-2 border-b"
      tabIndex={0}
      onKeyDown={handleKeyPress}
    >
      <div className="flex items-center">
        <span
          className={`h-6 w-6 rounded-full border-2 ${priorityColors[priority]} flex justify-center items-center`}
        >
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggleComplete(id)}
            tabIndex={0}
            className="appearance-none h-4 w-4 rounded-full bg-white border-none"
          />
        </span>

        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            tabIndex={0}
            className="ml-2 border border-gray-300 rounded p-1 focus:outline-none"
            autoFocus
          />
        ) : (
          <span
            className={
              completed
                ? "line-through ml-2 cursor-pointer"
                : "ml-2 cursor-pointer"
            }
            onClick={() => setIsEditing(true)}
          >
            {name}
          </span>
        )}
      </div>
      <div className="flex items-center">
        <IconButton onClick={() => onDeleteTask(id)} icon="delete" />
      </div>
    </div>
  );
};

export default ToDoItem;
