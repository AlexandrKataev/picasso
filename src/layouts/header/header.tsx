import { BackButton } from '@shared/ui';
import styles from './header.module.scss';
import { useMatch } from 'react-router-dom';

export const Header = () => {
  const isHomePage = useMatch('/');

  return (
    <header className={styles.container}>
      {!isHomePage && <BackButton />}
      <h1 className={styles.title}>Kataev Alexander Test Project</h1>
    </header>
  );
};
