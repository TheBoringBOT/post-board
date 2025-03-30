import type { PostProps } from '../../api/types';
import PostControls from '../post-controls';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { getPostPath } from '../../utils/slug';
import { usePosts } from '../../hooks/usePosts';

interface PostTeaserProps {
  title?: string;
  body?: string;
  id?: number;
  post?: PostProps;
}

const PostTeaser = ({ title, body, id, post }: PostTeaserProps) => {
  const navigate = useNavigate();
  const { deletePost } = usePosts();

  // Use post prop if provided, otherwise use individual props
  const postTitle = post?.title || title;
  const postBody = post?.body || body;
  const postId = post?.id || id;

  const postPath = getPostPath(postId!, postTitle!);

  const handleEdit = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigate(`/edit/${postId}`);
  };

  const handleDelete = async (e?: React.MouseEvent) => {
    e?.stopPropagation();

    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId!);
        console.log(`PostTeaser: Successfully deleted post ${postId}`);
      } catch (error) {
        console.error('Failed to delete post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  const handleClick = () => {
    navigate(postPath);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.wrapper} onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
        <span className={styles.id}>#{postId}</span>
        <PostControls onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      <h3 className={styles.title}>{postTitle}</h3>
      <p className={styles.body}>{postBody}</p>
    </div>
  );
};

export default PostTeaser;
