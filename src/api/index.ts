import { PostProps as Post, CommentProps as Comment, UserProps as User } from './types';

const API_URL = import.meta.env.VITE_API_URL as string;

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts in fetchPosts api call', error);
    throw error;
  }
};

export const fetchPost = async (id: number): Promise<Post> => {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching post in fetchPost api call', error);
    throw error;
  }
};

export const fetchComments = async (): Promise<Comment[]> => {
  try {
    const response = await fetch(`${API_URL}/comments`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching comments in fetchComments api call', error);
    throw error;
  }
};

export const createPost = async (
  title: string,
  body: string,
  userId: number = 1,
): Promise<Post> => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating post', error);
    throw error;
  }
};

export const updatePost = async (id: number, title: string, body: string): Promise<Post> => {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        title,
        body,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating post', error);
    throw error;
  }
};

export const deletePost = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting post', error);
    throw error;
  }
};

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users in fetchUsers api call', error);
    throw error;
  }
};

export const fetchUser = async (id: number): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user in fetchUser api call', error);
    throw error;
  }
};

export const fetchUserPosts = async (userId: number): Promise<Post[]> => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/posts`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user posts in fetchUserPosts api call', error);
    throw error;
  }
};
