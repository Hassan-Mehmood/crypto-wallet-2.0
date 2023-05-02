import { Box } from '@chakra-ui/react';
import SearchCoin from '../components/AddCoin/SearchCoin';
import AddCoinForm from '../components/AddCoin/AddCoinForm';

export default function AddCoinPage() {
  return (
    <Box as="section">
      <SearchCoin />
      <AddCoinForm />
    </Box>
  );
}
