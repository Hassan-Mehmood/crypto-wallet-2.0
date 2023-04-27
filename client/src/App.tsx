import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar/Navbar';
import Highlights from './components/highlights/Highlights';
import Table from './MarketTable/Table';

function App() {
  return (
    <Box as="main" px={5} mx="auto" maxW="1402px">
      <Navbar />
      <Highlights />
      {/* <Table /> */}
    </Box>
  );
}

export default App;
