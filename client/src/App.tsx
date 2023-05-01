import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar/Navbar';
import Highlights from './components/highlights/Highlights';
import CoinsTable from './components/MarketTable/CoinsTable';

function App() {
  return (
    <Box as="main" px={5} mx="auto" maxW="1402px">
      <Navbar />
      <Highlights />
      <CoinsTable />
    </Box>
  );
}

export default App;
