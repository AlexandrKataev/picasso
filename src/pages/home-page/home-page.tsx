import styles from './home-page.module.scss';

import { useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { RootState, useAppSelector } from '@app/store/store';
import { PostRow, useGetPostsQuery } from '@entities/post';
import { Loader, ScrollUpButton } from '@shared/ui';
import { useWindowSize } from '@shared/lib';

export const HomePage = () => {
  const windowSize = useWindowSize();
  const [showScrollUp, setShowScrollUp] = useState(false);

  const page = useAppSelector((state: RootState) => state.postState.page);
  const totalCount = useAppSelector((state: RootState) => state.postState.totalCount);

  const { data: posts = [], isFetching } = useGetPostsQuery({ limit: 10, start: page * 10 });

  const postsCount = posts.length;
  const hasNextPage = totalCount > postsCount + 1;

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: hasNextPage ? postsCount + 1 : postsCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 367,
    overscan: 2,
  });

  const items = virtualizer.getVirtualItems();
  const isItemLoaded = (index: number) => !hasNextPage || index < postsCount;

  return (
    <div className={styles.container}>
      {showScrollUp && (
        <ScrollUpButton
          onClick={() => {
            virtualizer.scrollToIndex(0);
          }}
        />
      )}
      {isFetching && postsCount === 0 && (
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
                ref={virtualizer.measureElement}>
                <div style={{ padding: '20px 0' }}>
                  <PostRow
                    {...posts[virtualRow.index]}
                    isItemLoaded={isItemLoaded(virtualRow.index)}
                    setShowUp={setShowScrollUp}
                    showUp={showScrollUp}
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
