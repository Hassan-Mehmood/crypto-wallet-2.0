import { Box, Flex } from '@chakra-ui/react';
import AddCoin from '../components/AddCoinPage/AddCoin';
import SelectCoin from '../components/AddCoinPage/SelectCoin';

export default function AddCoinPage() {
  return (
    <Flex as="section"  flexDir="column" justifyContent={"space-between"}>
      {/* <Box px={5} py="2rem" mx="auto" maxW="1402px" minH="calc(100vh-75px)"> */}
        {/* <Flex align="self-start" justify="space-evenly" minH="100%"> */}
          <SelectCoin />
          <AddCoin />
        {/* </Flex> */}
      {/* </Box> */}
    </Flex>
  );
}
