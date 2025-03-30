import { useState, useMemo, useEffect } from 'react';
import { PostProps } from '../api/types';

interface UsePaginationResult {
  currentPosts: PostProps[];
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}

export function usePagination(posts: PostProps[], itemsPerPage: number = 10): UsePaginationResult {
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect so it resets ifg you delete an item
  useEffect(() => {
    setCurrentPage(1);
  }, [posts.length]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(posts.length / itemsPerPage)),
    [posts, itemsPerPage],
  );

  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return posts.slice(startIndex, startIndex + itemsPerPage);
  }, [posts, currentPage, itemsPerPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  return {
    currentPosts,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  };
}
