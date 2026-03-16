import React, { useState } from "react";
import { Rating as RatingIcon, TextField, Button, Box } from "@mui/material";

interface RatingInputProps {
  onSubmit: (stars: number, comment?: string) => void;
}

export const RatingInput: React.FC<RatingInputProps> = ({ onSubmit }) => {
  const [stars, setStars] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = () => {
    if (stars !== null) {
      onSubmit(stars, comment);
      setStars(null);
      setComment("");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <RatingIcon
        value={stars}
        onChange={(_, newValue) => setStars(newValue)}
        precision={1}
        max={5}
      />
      <TextField
        label="Comment (optional)"
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="bg-white"
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={stars === null}
        className="bg-blue-600 hover:bg-blue-700"
      >
        Submit Rating
      </Button>
    </Box>
  );
};
