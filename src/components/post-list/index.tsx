import type { PostProps } from '../../api/types';
import styles from './styles.module.css';
import PostTeaser from '../post-teaser';
import Pagination from '../pagination';

interface PostListProps {
  posts: PostProps[];
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const PostList = ({ posts, currentPage, totalPages, onNextPage, onPrevPage }: PostListProps) => {
  const handlePageChange = (page: number) => {
    if (page > currentPage) {
      onNextPage();
    } else if (page < currentPage) {
      onPrevPage();
    }
  };

  console.log(`PostList: Rendering ${posts.length} posts, page ${currentPage} of ${totalPages}`);

  return (
    <div className={styles.postList}>
      {posts.length === 0 ? (
        <div className={styles.noPosts}>No posts found</div>
      ) : (
        posts.map((post) => <PostTeaser key={post.id} {...post} />)
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default PostList;
