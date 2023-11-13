import { HomePage, PostPage } from '@pages';
import { Routes, Route, Navigate } from 'react-router-dom';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts/:postId" element={<PostPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
