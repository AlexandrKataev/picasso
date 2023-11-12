import { DotLoader } from 'react-spinners';
import { CSSProperties } from 'react';

export const Loader = ({ cssOverride }: { cssOverride?: CSSProperties }) => {
  return <DotLoader color="#ff6600" cssOverride={cssOverride} />;
};
