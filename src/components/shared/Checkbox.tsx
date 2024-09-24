import React from "react";

interface CheckboxProps {
  completed: boolean;
  onToggle: () => void;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ completed, onToggle, label }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        className="h-5 w-5 text-green-500 rounded border-gray-300 focus:ring-green-500"
      />
      <label
        className={`ml-2 ${
          completed ? "line-through text-gray-400" : "text-black"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
