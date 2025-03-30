import type { PostProps } from '../../api/types';
import styles from './styles.module.css';

const Post = ({ title, body }: PostProps) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <p>{body}</p>
    </div>
  );
};

export default Post;
