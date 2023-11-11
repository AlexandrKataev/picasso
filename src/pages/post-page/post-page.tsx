import { useParams } from 'react-router-dom';
import styles from './post-page.module.scss';
import { useGetPostByIdQuery } from '@entities/post';

export const PostPage = () => {
  const postId = useParams().postId || 1;
  const { data } = useGetPostByIdQuery(+postId);
  return (
    <div>
      <div>{data?.id}</div>
    </div>
  );
};
