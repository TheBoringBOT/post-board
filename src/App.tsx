import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import '@csstools/normalize.css';

import Navbar from './components/navbar/';
import Layout from './components/layout';
import PostList from './components/post-list';
import ViewPost from './pages/ViewPost';
import EditPost from './pages/EditPost';
import CreatePost from './pages/CreatePost';
import NotFound from './pages/NotFound';
import Users from './pages/Users';
import UserPosts from './pages/UserPosts';
import { usePagination } from './hooks/usePagination';
import { useScrollToTop } from './hooks/useScrollToTop';
import { PostsProvider } from './contexts/PostsContext';
import { UsersProvider } from './contexts/UsersContext';
import { usePosts } from './hooks/usePosts';

function HomePage() {
  const { posts, loading, error } = usePosts();
  const { currentPosts, currentPage, totalPages, nextPage, prevPage } = usePagination(posts);

  if (loading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div>Error: {error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PostList
        posts={currentPosts}
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={nextPage}
        onPrevPage={prevPage}
      />
    </Layout>
  );
}

function ScrollToTop() {
  useScrollToTop();
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <PostsProvider>
        <UsersProvider>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id/:slug?" element={<ViewPost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id/posts" element={<UserPosts />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UsersProvider>
      </PostsProvider>
    </BrowserRouter>
  );
}

export default App;
