import React from "react";
import Button, { ButtonProps as MUIButtonProps } from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

interface IconButtonProps extends MUIButtonProps {
  onClick: () => void;
  label?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, ...props }) => {
  return (
    <Button
      startIcon={<DeleteIcon />}
      onClick={onClick}
      {...props}
      sx={{
        color: "gray",
        borderColor: "gray",
        ":hover": {
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          borderColor: "red",
        },
        borderRadius: "50%",
        minWidth: "auto",
        width: { xs: "2.5rem", md: "3rem" },
        height: { xs: "2.5rem", md: "3rem" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...props.sx,
      }}
    ></Button>
  );
};

export default IconButton;
