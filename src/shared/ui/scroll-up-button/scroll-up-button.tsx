import { ArrowUpIcon } from '@shared/ui';
import styles from './scroll-up-button.module.scss';

interface SrollUpButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ScrollUpButton = (props: SrollUpButtonProps) => {
  return (
    <button className={styles.container} {...props}>
      <ArrowUpIcon />
    </button>
  );
};
