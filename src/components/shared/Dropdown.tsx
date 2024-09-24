import { useState } from "react";

interface DropdownProps {
  priority: number;
  onChange: (priority: number) => void;
}

const priorityOptions = [
  { label: "Low", value: 1, color: "bg-red-500" },
  { label: "Medium", value: 2, color: "bg-yellow-500" },
  { label: "High", value: 3, color: "bg-blue-500" },
  { label: "Urgent", value: 4, color: "bg-gray-500" },
];

const Dropdown: React.FC<DropdownProps> = ({ priority, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(priority);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Priority
      </label>
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {priorityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
