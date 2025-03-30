import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';
import { PostControlsProps } from './types';

const PostControls = ({ onEdit, onDelete }: PostControlsProps) => {
  return (
    <div className={styles.controls}>
      <button className={styles.button} onClick={onEdit} aria-label="Edit post">
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
      <button className={styles.button} onClick={onDelete} aria-label="Delete post">
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default PostControls;
