import { Link } from 'react-router-dom';
import Layout from '../../components/layout';
import { useUsers } from '../../hooks/useUsers';
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Users = () => {
  const { users, loading, error } = useUsers();

  if (loading) {
    return (
      <Layout>
        <div>Loading users...</div>
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
      <h1>Users</h1>
      <div className={styles.users}>
        {users.map((user) => (
          <Link to={`/users/${user.id}/posts`} key={user.id} className={styles.user}>
            <h2>{user.name}</h2>
            <div className={styles.actions}>
              <span className={styles.button}>
                View Posts <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Users;
