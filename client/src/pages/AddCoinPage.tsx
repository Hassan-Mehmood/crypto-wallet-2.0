import { Flex } from '@chakra-ui/react';
import AddCoin from '../components/AddCoinPage/AddCoin';
import SelectCoin from '../components/AddCoinPage/SelectCoin';

export default function AddCoinPage() {
  return (
    <Flex flexDir={"column"} alignItems={"center"} justifyContent={"center"} width={"full"} pt={["1rem", "2rem"]}>
      <SelectCoin />
      <AddCoin />
    </Flex>
  );
}
