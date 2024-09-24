import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

interface IconButtonProps {
  onClick: () => void;
  label?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="outlined"
      startIcon={<DeleteIcon />}
      onClick={onClick}
      className="text-red-500 border-red-500 hover:bg-red-50"
    ></Button>
  );
};

export default IconButton;
