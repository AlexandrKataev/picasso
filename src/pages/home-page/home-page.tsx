import { PostListItem, nextPage, useGetPostsQuery } from '@entities/post';
import styles from './home-page.module.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@app/store/store';

export const HomePage = () => {
  const page = useAppSelector((state) => state.postState.page);
  const dispatch = useAppDispatch();
  const totalCount = useAppSelector((state) => state.postState.totalCount);
  const { data = [], isFetching } = useGetPostsQuery({ limit: 10, start: page * 10 });

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching && totalCount > data.length + 1) {
        console.log('Total posts: ' + totalCount, 'Posts loaded: ' + data.length, page);
        dispatch(nextPage());
      }
    };

    document.addEventListener('scroll', onScroll);

    return function () {
      document.removeEventListener('scroll', onScroll);
    };
  }, [page, isFetching, totalCount]);
  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {data.map((el) => (
        <PostListItem {...el} key={el.id} />
      ))}
    </div>
  );
};
