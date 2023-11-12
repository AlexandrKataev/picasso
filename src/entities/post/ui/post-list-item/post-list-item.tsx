import { Post, nextPage } from '@entities/post';
import styles from './post-list-item.module.scss';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useAppDispatch } from '@app/store/store';
import { useEffect, CSSProperties } from 'react';
import { DotLoader } from 'react-spinners';

interface PostListItemProps extends Post {
  // style: any;
  isItemLoaded: boolean;
}

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
};

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
          <DotLoader color="#ff6600" cssOverride={override} />
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
