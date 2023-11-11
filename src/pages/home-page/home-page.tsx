import { PostListItem, useGetPostsQuery } from '@entities/post';
import styles from './home-page.module.scss';

export const HomePage = () => {
  const { data = [] } = useGetPostsQuery({ limit: 10, start: 0 });
  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {data.map((el) => (
        <PostListItem {...el} />
      ))}
    </div>
  );
};
