import { useContext } from 'react';
import { UsersContext, UsersContextType } from '../contexts/UsersContext';

export const useUsers = (): UsersContextType => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error('useUsers error - use within a UsersProvider');
  }

  return context;
};
