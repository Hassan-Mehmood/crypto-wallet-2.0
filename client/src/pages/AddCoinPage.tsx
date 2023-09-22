import { Flex } from '@chakra-ui/react';
import AddCoin from '../components/AddCoinPage/AddCoin';
import SelectCoin from '../components/AddCoinPage/SelectCoin';

export default function AddCoinPage() {
  return (
    <Flex
      flexDir={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'full'}
      pb={['1.5rem', '1.6rem']}
    >
      <SelectCoin />
      <AddCoin />
    </Flex>
  );
}
