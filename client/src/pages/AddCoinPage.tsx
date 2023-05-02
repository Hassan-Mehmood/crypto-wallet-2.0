import { Box, Flex } from '@chakra-ui/react';
import SearchCoin from '../components/AddCoin/SearchCoin';
import AddCoinForm from '../components/AddCoin/AddCoinForm';

export default function AddCoinPage() {
  return (
    <Box as="section">
      <Box px={5} py="2rem" mx="auto" maxW="1402px" minH="calc(100vh-75px)">
        <Flex align="self-start" justify="space-evenly" minH="100%">
          <AddCoinForm />
          <SearchCoin />
        </Flex>
      </Box>
    </Box>
  );
}
