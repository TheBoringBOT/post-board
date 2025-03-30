import { useContext } from 'react';
import { PostsContext, PostsContextType } from '../contexts/PostsContext';

export const usePosts = (): PostsContextType => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('no usePosts context found');
  }
  return context;
};
