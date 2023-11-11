import { Post } from '@entities/post';
import styles from './post-list-item.module.scss';
import { useNavigate } from 'react-router-dom';

interface PostListItemProps extends Post {
  style: any;
  isItemLoaded: boolean;
}

export const PostListItem = ({ id, title, body, style, isItemLoaded }: PostListItemProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container} style={style}>
      <div className={styles.wrapper}>
        {!isItemLoaded && <h1>Loading....</h1>}
        <h2>
          <span className={styles.id}>#{id}</span> <span className={styles.title}>{title}</span>
        </h2>
        <div className={styles.body}>{body}</div>
        <button className={styles.readmore} onClick={() => navigate(`/posts/${id}`)}>
          {'Read More'}
        </button>
      </div>
    </div>
  );
};
