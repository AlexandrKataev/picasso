import { useNavigate, useParams } from 'react-router-dom';
import styles from './post-page.module.scss';
import { useGetPostByIdQuery } from '@entities/post';
import { ArrowLeftIcon, Loader } from '@shared/ui';
import { CommentRow, useGetCommentsQuery } from '@entities/comment';

export const PostPage = () => {
  const navigate = useNavigate();
  const postId = useParams().postId || 1;
  const { data: posts, isFetching, isError, isSuccess } = useGetPostByIdQuery(+postId);
  const { data: comments = [] } = useGetCommentsQuery(+postId);
  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate('/')}>
        <ArrowLeftIcon />
      </button>
      {isError && <h1 className={styles.notFound}> {'Post not founded =('}</h1>}

      {isFetching && (
        <Loader
          cssOverride={{
            margin: '70px auto',
          }}
        />
      )}
      {isSuccess && (
        <div className={styles.wrapper}>
          <h1 className={styles.postNumber}>Post #{posts?.id}</h1>
          <div className={styles.post}>
            <h2 className={styles.title}>{posts?.title}</h2>
            <div className={styles.body}>{posts?.body}</div>
          </div>
          <h3 className={styles.commentBlockTitle}>Commentaries</h3>
          <div className={styles.comments}>
            {comments.length > 0 && comments?.map((el) => <CommentRow {...el} />)}
          </div>
        </div>
      )}
    </div>
  );
};
