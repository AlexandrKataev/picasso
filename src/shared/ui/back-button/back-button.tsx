import { ArrowLeftIcon } from '@shared/ui';
import styles from './back-button.module.scss';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button className={styles.container} onClick={() => navigate('/')}>
      <ArrowLeftIcon />
    </button>
  );
};
