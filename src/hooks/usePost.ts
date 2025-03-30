import { useState, useEffect } from 'react';
import { PostProps } from '../api/types';
import { usePosts } from './usePosts';

interface UsePostResult {
  post: PostProps | null;
  loading: boolean;
  error: string | null;
}

export const usePost = (id: string | undefined): UsePostResult => {
  const [post, setPost] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { posts } = usePosts();

  useEffect(() => {
    if (!id || !posts) return;

    setLoading(true);
    const postId = parseInt(id, 10);
    const foundPost = posts.find((p) => p.id === postId);

    if (foundPost) {
      setPost(foundPost);
      setError(null);
    } else {
      setPost(null);
      setError('Post not found');
    }
    setLoading(false);
  }, [id, posts]);

  return { post, loading, error };
};
