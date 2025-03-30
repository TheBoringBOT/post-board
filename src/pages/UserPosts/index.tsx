import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout';
import PostTeaser from '../../components/post-teaser';
import BackButton from '../../components/back-button';
import { useUsers } from '../../hooks/useUsers';
import { PostProps, UserProps } from '../../api/types';
import styles from './styles.module.css';

const UserPosts = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getUserById, getUserPosts } = useUsers();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProps | null>(null);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) {
        navigate('/users');
        return;
      }

      try {
        setLoading(true);
        const userData = await getUserById(parseInt(id, 10));
        if (!userData) {
          setError('User not found');
          return;
        }
        setUser(userData);

        const userPosts = await getUserPosts(parseInt(id, 10));
        setPosts(userPosts);
      } catch (err) {
        setError(`Error loading user data: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, getUserById, getUserPosts, navigate]);

  if (loading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div>{error}</div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div>User not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.header}>
        <BackButton href="/users" label="Back to Users" />
        <h1>Posts by {user.name}</h1>
      </div>

      <div className={styles.info}>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
        <span>
          <strong>Email:</strong> {user.email}
        </span>
        <span>
          <strong>Website:</strong> {user.website}
        </span>
      </div>

      {posts.length === 0 ? (
        <div className={styles.noPosts}>No posts found for this user</div>
      ) : (
        <div className={styles.posts}>
          {posts.map((post) => (
            <PostTeaser key={post.id} post={post} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default UserPosts;
