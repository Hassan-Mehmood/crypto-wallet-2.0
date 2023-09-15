import { useColorMode } from '@chakra-ui/react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
export default function Loading() {
  const { colorMode } = useColorMode();

  return (
    <Skeleton
      count={10}
      style={{ margin: '15px 0px' }}
      baseColor={colorMode === 'light' ? '#eaeaea' : '#a0aec0'}
      highlightColor="#f5f5f5"
    />
  );
}
