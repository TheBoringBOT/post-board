import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout';
import BackButton from '../../components/back-button';
import PostForm from '../../components/post-form';
import styles from './styles.module.css';
import { usePosts } from '../../hooks/usePosts';
import { usePost } from '../../hooks/usePost';

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { post, loading, error } = usePost(id);
  const { updatePostById } = usePosts();

  const handleSubmit = async (title: string, body: string) => {
    if (!id) return;

    try {
      await updatePostById(parseInt(id, 10), title, body);
      navigate(`/post/${id}`);
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  if (loading)
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  if (error)
    return (
      <Layout>
        <div>Error: {error}</div>
      </Layout>
    );
  if (!post)
    return (
      <Layout>
        <div>Post not found</div>
      </Layout>
    );

  return (
    <Layout>
      <div className={styles.backContainer}>
        <BackButton onClick={() => navigate(`/post/${id}`)} />
      </div>
      <h1 className={styles.title}>Edit Post</h1>
      <PostForm initialValues={post} onSubmit={handleSubmit} submitButtonText="Save Changes" />
    </Layout>
  );
};

export default EditPost;
