import { ArrowLeftIcon } from '@shared/ui';
import styles from './header.module.scss';
import { useNavigate, useMatch } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const isHomePage = useMatch('/');

  return (
    <header className={styles.container}>
      {!isHomePage && (
        <button className={styles.back} onClick={() => navigate('/')}>
          <ArrowLeftIcon />
        </button>
      )}
      <h1 className={styles.title}>Kataev Alexander Test Project</h1>
    </header>
  );
};
