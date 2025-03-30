import logo from '/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const links = [
  { href: '/', label: 'Home' },
  { href: '/users', label: 'Users' },
  { href: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/create');
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" aria-label="home">
          <img className={styles.logo} src={logo} alt="logo ipsum" />
        </Link>

        <button className={styles.menuButton} aria-label="menu">
          <FontAwesomeIcon icon={faBars} />
        </button>

        <nav className={styles.menu}>
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link to={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <button className={styles.create} onClick={handleCreatePost}>
          <FontAwesomeIcon icon={faPlus} />
          Create Post
        </button>
      </div>
    </div>
  );
};

export default Navbar;
