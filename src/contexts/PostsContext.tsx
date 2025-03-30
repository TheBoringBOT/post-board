import { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { PostProps } from '../api/types';
import { fetchPosts, createPost, updatePost, deletePost as apiDeletePost } from '../api';

export interface PostsContextType {
  posts: PostProps[];
  loading: boolean;
  error: string | null;
  addPost: (title: string, body: string) => Promise<PostProps>;
  updatePostById: (id: number, title: string, body: string) => Promise<PostProps>;
  deletePost: (id: number) => Promise<void>;
  refetchPosts: () => Promise<void>;
}

export const PostsContext = createContext<PostsContextType | undefined>(undefined);

// Using a context to manage the posts state so we can keep the mock data locally and mutate it as needed
// could still use the same principles for a real api or just use fetches / posts generic functions

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchPosts();
      setPosts(data);
      setError(null);
    } catch (error) {
      setError(`Failed to load posts: ${error}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const addPost = async (title: string, body: string): Promise<PostProps> => {
    try {
      // api call just to explain the normal usage
      const newPost = await createPost(title, body);

      // now we can update our local version of the posts
      setPosts((currentPosts) => [newPost, ...currentPosts]);

      return newPost;
    } catch (error) {
      console.error('Error adding post:', error);
      throw error;
    }
  };

  const updatePostById = async (id: number, title: string, body: string): Promise<PostProps> => {
    try {
      // api call for updating the post
      const updatedPost = await updatePost(id, title, body);

      // Update local state posts
      setPosts((currentPosts) =>
        currentPosts.map((post) => (post.id === id ? { ...post, title, body } : post)),
      );

      return updatedPost;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  };

  const deletePost = async (id: number): Promise<void> => {
    if (!id) {
      console.error('Invalid post ID for deletion');
      return;
    }

    try {
      console.log(`Deleting post with id: ${id}`);

      // Make a copy of current posts before the API call
      const currentPosts = [...posts];

      // Update UI first for immediate feedback
      setPosts(currentPosts.filter((post) => post.id !== id));

      // Then call API
      await apiDeletePost(id);
      console.log('API delete successful');
    } catch (error) {
      console.error('Error deleting post:', error);

      // If API fails, revert the UI change
      const currentPostIds = posts.map((p) => p.id);
      if (!currentPostIds.includes(id)) {
        // Only revert if post is still deleted from UI
        const deletedPost = posts.find((p) => p.id === id);
        if (deletedPost) {
          setPosts((prev) => [...prev, deletedPost]);
        }
      }

      throw error;
    }
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        loading,
        error,
        addPost,
        updatePostById,
        deletePost,
        refetchPosts: loadPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
