import { useState } from "react";
import { useAnalytics } from "../hooks/useAnalytics";

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
      <input
        type="text"
        placeholder="New task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="p-2 border rounded"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
        tabIndex={0} // Allow tab focus
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            document.getElementById("add-task-btn")?.focus();
          }
        }}
        className="ml-2 p-2 border rounded"
      >
        <option value={1}>Low</option>
        <option value={2}>Medium</option>
        <option value={3}>High</option>
        <option value={4}>Urgent</option>
      </select>
      <button
        id="add-task-btn"
        onClick={handleAddTask}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="ml-2 bg-blue-500 text-white p-2 rounded"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
