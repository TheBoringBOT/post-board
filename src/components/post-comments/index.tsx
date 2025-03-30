import { useState, useEffect } from 'react';
import { CommentProps } from '../../api/types';
import { fetchComments } from '../../api';
import styles from './styles.module.css';

const PostComments = ({ postId }: { postId: number }) => {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);
        const allComments = await fetchComments();
        const postComments = allComments.filter((comment) => comment.postId === postId);
        setComments(postComments);
        setError(null);
      } catch (err) {
        setError('Failed to load comments');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [postId]);

  if (loading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Comments ({comments.length})</h3>
      {comments.length === 0 ? (
        <p className={styles.noComments}>No comments</p>
      ) : (
        <div className={styles.list}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.item}>
              <span className={styles.name}>{comment.name}</span>
              <span className={styles.email}>By: {comment.email}</span>
              <p className={styles.body}>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostComments;
