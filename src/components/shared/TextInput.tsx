import React, { useState } from "react";

interface TextInputProps {
  value: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}

const TextInput: React.FC<TextInputProps> = ({ value, onSave, onCancel }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSave(inputValue);
    } else if (event.key === "Escape") {
      onCancel();
      setInputValue(value);
    }
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      className="block w-full p-2 border rounded"
    />
  );
};

export default TextInput;
