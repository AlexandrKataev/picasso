import { useNavigate, useParams } from 'react-router-dom';
import styles from './post-page.module.scss';
import { useGetPostByIdQuery } from '@entities/post';

export const PostPage = () => {
  const navigate = useNavigate();
  const postId = useParams().postId || 1;
  const { data } = useGetPostByIdQuery(+postId);
  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate('/')}>
        {'<= Back'}
      </button>
      <h1>Post {data?.id}</h1>
      <div className={styles.post}>
        <h2 className={styles.title}>{data?.title}</h2>
        <div className={styles.body}>{data?.body}</div>
        <div className={styles.body}>{data?.userId}</div>
      </div>
    </div>
  );
};
