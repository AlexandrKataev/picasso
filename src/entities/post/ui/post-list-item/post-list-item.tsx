import styles from './post-list-item.module.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { useAppDispatch } from '@app/store/store';
import { Post, nextPage } from '@entities/post';

import { Loader } from '@shared/ui';

interface PostListItemProps extends Post {
  isItemLoaded: boolean;
}

export const PostListItem = ({ id, title, body, isItemLoaded }: PostListItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    inView && dispatch(nextPage());
  }, [inView]);

  return (
    <div className={styles.container}>
      {!isItemLoaded && (
        <div ref={ref} className={styles.loader}>
          <Loader />
        </div>
      )}
      {isItemLoaded && (
        <div className={styles.wrapper}>
          <h2>
            <span className={styles.id}>#{id}</span> <span className={styles.title}>{title}</span>
          </h2>
          <div className={styles.body}>{body}</div>
          <button className={styles.readmore} onClick={() => navigate(`/posts/${id}`)}>
            {'Read More'}
          </button>
        </div>
      )}
    </div>
  );
};
