import { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { UserProps } from '../api/types';
import { fetchUsers, fetchUser, fetchUserPosts } from '../api';

export interface UsersContextType {
  users: UserProps[];
  loading: boolean;
  error: string | null;
  getUserById: (id: number) => Promise<UserProps | undefined>;
  getUserPosts: (userId: number) => Promise<import('../api/types').PostProps[]>;
  refetchUsers: () => Promise<void>;
}

export const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
      setError(null);
    } catch (error) {
      setError(`Failed to load users: ${error}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const getUserById = async (id: number): Promise<UserProps | undefined> => {
    try {
      const user = await fetchUser(id);
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  };

  const getUserPosts = async (userId: number) => {
    try {
      const posts = await fetchUserPosts(userId);
      return posts;
    } catch (error) {
      console.error('Error fetching user posts:', error);
      throw error;
    }
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        error,
        getUserById,
        getUserPosts,
        refetchUsers: loadUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
