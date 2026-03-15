import { useState, useCallback } from "react";
import api from "../lib/api";
import { RatingModel, CreateRatingModel } from "../models/RatingModel";

export const useRatings = () => {
  const [ratings, setRatings] = useState<RatingModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch ratings by book ID
  const fetchRatings = useCallback(async (bookId: string, sortBy?: string, sortOrder: "ASC" | "DESC" = "ASC") => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<RatingModel[]>(`books/${bookId}/ratings`, {
        params: { sortBy, sortOrder },
      });
      setRatings(response.data);
    } catch (error) {
      setError("Failed to fetch ratings.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new rating
  const addRating = useCallback(async (bookId: string, rating: CreateRatingModel) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<RatingModel>(`books/${bookId}/ratings`, rating);
      setRatings((prevRatings) => [...prevRatings, response.data]);
      return response.data;
    } catch (error) {
      setError("Failed to add rating.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a rating
  const deleteRating = useCallback(async (bookId: string, ratingId: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`books/${bookId}/ratings/${ratingId}`);
      setRatings((prevRatings) => prevRatings.filter((rating) => rating.id !== ratingId)); 
    } catch (error) {
      setError("Failed to delete rating.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { ratings, loading, error, fetchRatings, addRating, deleteRating }; 
};