import { useRef, useState } from 'react';
import styles from './home-page.module.scss';

import { useVirtualizer } from '@tanstack/react-virtual';
import { RootState, useAppSelector } from '@app/store/store';
import { PostListItem, useGetPostsQuery } from '@entities/post';
import { ArrowUpIcon, Loader } from '@shared/ui';
import { useWindowSize } from '@shared/lib';

export const HomePage = () => {
  const windowSize = useWindowSize();
  const [showUp, setShowUp] = useState(false);

  const page = useAppSelector((state: RootState) => state.postState.page);
  const totalCount = useAppSelector((state: RootState) => state.postState.totalCount);
  const { data = [], isFetching } = useGetPostsQuery({ limit: 10, start: page * 10 });
  const count = data.length;

  const hasNextPage = totalCount > count + 1;

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: hasNextPage ? count + 1 : count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 367,
    overscan: 2,
  });

  const items = virtualizer.getVirtualItems();
  const isItemLoaded = (index: number) => !hasNextPage || index < data.length;

  return (
    <div className={styles.container}>
      {showUp && (
        <button
          className={styles.scrollToStart}
          onClick={() => {
            virtualizer.scrollToIndex(0);
          }}>
          <ArrowUpIcon />
        </button>
      )}
      {isFetching && count === 0 && (
        <Loader
          cssOverride={{
            margin: '70px auto',
          }}
        />
      )}
      <div
        ref={parentRef}
        className={styles.list}
        style={{
          height: windowSize.height - 132,
          width: windowSize.width > 750 ? 750 : windowSize.width,
          overflowY: 'auto',
          contain: 'strict',
        }}>
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: '100%',
            position: 'relative',
          }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${items[0]?.start ?? 0}px)`,
            }}>
            {items.map((virtualRow) => (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}>
                <div style={{ padding: '20px 0' }}>
                  <PostListItem
                    {...data[virtualRow.index]}
                    isItemLoaded={isItemLoaded(virtualRow.index)}
                    setShowUp={setShowUp}
                    showUp={showUp}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
