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
      startIcon={<DeleteIcon />}
      onClick={onClick}
      sx={{
        color: "gray",
        borderColor: "gray",
        ":hover": {
          backgroundColor: "rgba(255, 0, 0, 0.1)",
        },

        padding: "0.5rem 1rem",
        fontSize: { xs: "0.75rem", md: "1rem" },
      }}
    ></Button>
  );
};

export default IconButton;
