import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
export default function Loading() {
  return (
    <Skeleton
      count={10}
      style={{ margin: '15px 0px' }}
      baseColor="#e0e0e0"
      highlightColor="#f5f5f5"
    />
  );
}
