import { PostListItem, nextPage, useGetPostsQuery } from '@entities/post';
import styles from './home-page.module.scss';
import { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '@app/store/store';

import { FixedSizeList, VariableSizeGrid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useWindowHeight } from '@shared/lib/useWindowHeight';

export const HomePage = () => {
  const dispatch = useAppDispatch();

  const windowHeight = useWindowHeight();
  const page = useAppSelector((state: RootState) => state.postState.page);
  const totalCount = useAppSelector((state: RootState) => state.postState.totalCount);

  const { data = [], isFetching } = useGetPostsQuery({ limit: 10, start: page * 10 });

  useEffect(() => {
    console.log(`Загружено ${data.length}`, `Всего ${totalCount}`);
  }, [data.length, totalCount]);

  const hasNextPage = totalCount > data.length;
  const itemCount = hasNextPage ? data.length + 1 : data.length;
  const isItemLoaded = (index: number) => !hasNextPage || index < data.length;

  const loadMoreItems = () => {
    console.log('next page');
    if (!isFetching) {
      dispatch(nextPage());
    }
  };

  return (
    <div className={styles.container}>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}>
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            onItemsRendered={onItemsRendered}
            ref={ref}
            itemData={data}
            itemCount={itemCount}
            itemSize={280}
            height={windowHeight - 150}
            width={830}
            innerElementType="div"
            className={styles.list}
            style={{}}>
            {({ index, data, style }) => {
              return (
                <PostListItem
                  {...data[index]}
                  key={index}
                  style={style}
                  isItemLoaded={isItemLoaded(index)}
                />
              );
            }}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </div>
  );
};
