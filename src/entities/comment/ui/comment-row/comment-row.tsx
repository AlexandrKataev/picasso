import { Comment } from '@entities/comment';
import styles from './comment-row.module.scss';

export const CommentRow = ({ body, email }: Comment) => {
  return (
    <div className={styles.container}>
      <div className={styles.email}>{email}</div>
      <div className={styles.body}>{body}</div>
    </div>
  );
};
