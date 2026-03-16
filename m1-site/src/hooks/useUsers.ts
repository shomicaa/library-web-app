import { useState, useCallback } from "react";
import api from "../lib/api";

export interface UserModel {
  id: string;
  username: string;
  role: "user" | "admin";
}

export const useUsers = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<UserModel[]>("/users");
      setUsers(res.data);
    } catch {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = async (id: string) => {
    await api.delete(`/users/${id}`);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return { users, loading, error, fetchUsers, deleteUser };
};
