import { Post } from '@entities/post';
import styles from './post-list-item.module.scss';
import { useNavigate } from 'react-router-dom';

interface PostListItemProps extends Post {}

export const PostListItem = ({ id, title, body }: PostListItemProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2>
        <span className={styles.id}>#{id}</span> <span className={styles.title}>{title}</span>
      </h2>
      <div className={styles.body}>{body}</div>
      <button className={styles.readmore} onClick={() => navigate(`/posts/${id}`)}>
        {'Read More'}
      </button>
    </div>
  );
};
