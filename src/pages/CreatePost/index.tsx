import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout';
import BackButton from '../../components/back-button';
import PostForm from '../../components/post-form';
import styles from './styles.module.css';
import { usePosts } from '../../hooks/usePosts';

const CreatePost = () => {
  const navigate = useNavigate();
  const { addPost } = usePosts();

  const handleSubmit = async (title: string, body: string) => {
    try {
      await addPost(title, body);
      navigate('/');
    } catch {
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <Layout>
      <div className={styles.backContainer}>
        <BackButton onClick={() => navigate('/')} />
      </div>
      <h1 className={styles.title}>Create Post</h1>
      <PostForm onSubmit={handleSubmit} submitButtonText="Publish Post" />
    </Layout>
  );
};

export default CreatePost;
