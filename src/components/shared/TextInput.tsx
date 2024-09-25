import React, { useState, useCallback } from "react";
import { Box, Grid, TextField } from "@mui/material";

interface TextInputProps {
  value: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}

const TextInput: React.FC<TextInputProps> = ({ value, onSave, onCancel }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        onSave(inputValue);
      } else if (event.key === "Escape") {
        setInputValue(value);
        onCancel();
      }
    },
    [inputValue, value, onSave, onCancel]
  );

  const handleBlur = useCallback(() => {
    onSave(inputValue);
  }, [inputValue, onSave]);

  return (
    <Grid container spacing={2} sx={{ marginTop: 2 }}>
      <Grid item xs={12} md={8}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            p: 2,
            borderRadius: 1,
            borderColor: "grey.300",
            bgcolor: "background.paper",
          }}
        >
          <TextField
            type="text"
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            sx={{
              typography: {
                xs: "body1", // for smaller screens
                md: "h6", // for larger screens
              },
              width: { xs: "100%", md: "80%" }, // adjust width based on the screen size
            }}
            autoFocus
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default TextInput;
