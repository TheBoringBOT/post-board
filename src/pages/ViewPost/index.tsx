import { useParams, useNavigate } from 'react-router-dom';
import Post from '../../components/post';
import Layout from '../../components/layout';
import PostControls from '../../components/post-controls';
import BackButton from '../../components/back-button';
import PostComments from '../../components/post-comments';
import styles from './styles.module.css';
import { usePosts } from '../../hooks/usePosts';
import { usePost } from '../../hooks/usePost';

const ViewPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { post, loading, error } = usePost(id);
  const { deletePost } = usePosts();

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    if (!id) return;

    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const postId = parseInt(id, 10);
        console.log(`ViewPost: Deleting post ${postId}`);

        await deletePost(postId);
        console.log('ViewPost: Delete successful, navigating to homepage');

        // Force refresh of posts when navigating to homepage
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Failed to delete post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  if (loading)
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );

  if (error || !post)
    return (
      <Layout>
        <div>Error: {error || 'Post not found'}</div>
      </Layout>
    );

  return (
    <Layout>
      <div className={styles.backContainer}>
        <BackButton onClick={() => navigate('/')} />
        <PostControls onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      <Post {...post} />
      <PostComments postId={post.id} />
    </Layout>
  );
};

export default ViewPost;
