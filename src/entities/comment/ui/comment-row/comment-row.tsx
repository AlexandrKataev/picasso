import { Comment } from '@entities/comment';
import styles from './comment-row.module.scss';

export const CommentRow = ({ body }: Comment) => {
  return <div>{body}</div>;
};
