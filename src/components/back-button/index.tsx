import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { BackButtonProps } from './types';

const BackButton = ({ onClick, href, label = 'Back' }: BackButtonProps) => {
  if (href) {
    return (
      <Link to={href} className={styles.backButton} aria-label="Go back">
        <FontAwesomeIcon icon={faChevronLeft} />
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles.backButton} aria-label="Go back">
      <FontAwesomeIcon icon={faChevronLeft} />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;
