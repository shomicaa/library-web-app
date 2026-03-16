import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Box,
  Rating as RatingIcon,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { RatingModel } from "../models/RatingModel";

interface RatingsDrawerProps {
  ratings: RatingModel[];
  isOpen: boolean;
  onClose: () => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (order: "asc" | "desc") => void;
  onDeleteRating: (bookId: string, ratingId: string) => void;
}

export const RatingsDrawer: React.FC<RatingsDrawerProps> = ({
  ratings,
  isOpen,
  onClose,
  sortOrder,
  onSortOrderChange,
  onDeleteRating,
}) => {
  const sortedRatings = [...ratings].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 400, p: 2 }}>
        <Typography variant="h6" className="text-gray-800 mb-4">
          Ratings
        </Typography>
        <Button
          onClick={() =>
            onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")
          }
          className="mb-4"
        >
          Sort by Date ({sortOrder === "asc" ? "Oldest First" : "Newest First"})
        </Button>
        <List>
          {sortedRatings.map((rating) => (
            <ListItem
              key={rating.id}
              className="border-b border-gray-200"
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDeleteRating(rating.bookId, rating.id)}
                  sx={{ color: "rgba(0, 0, 0, 0.26)" }}
                >
                  <Delete fontSize="small" /> {/* Use a small delete icon */}
                </IconButton>
              }
            >
              <ListItemText
                primary={<RatingIcon value={rating.stars} readOnly />}
                secondary={
                  <>
                    <Typography variant="body2" className="text-gray-700">
                      {rating.comment}
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      {new Date(rating.createdAt).toLocaleDateString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
