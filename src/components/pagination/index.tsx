import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';
import { PaginationProps } from './types';

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        aria-label="Previous"
        className={styles.button}
        onClick={handlePrevious}
        disabled={currentPage <= 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <span className={styles.pageInfo}>
        {currentPage} / {totalPages}
      </span>
      <button
        aria-label="next"
        className={styles.button}
        onClick={handleNext}
        disabled={currentPage >= totalPages}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Pagination;
