import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout';
import BackButton from '../../components/back-button';
import logo from '/logo.svg';
import styles from './styles.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className={styles.container}>
        <img src={logo} alt="Logo" className={styles.logo} />

        <h1 className={styles.title}>404</h1>

        <div className={styles.poem}>
          <p>Went for a walk, found rain, kept going — classic British day out.</p>
          <p>Oh yeah, also, page not found.</p>
        </div>

        <div className={styles.homeButtonContainer}>
          <BackButton onClick={() => navigate('/')} label="Back to Home" />
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
