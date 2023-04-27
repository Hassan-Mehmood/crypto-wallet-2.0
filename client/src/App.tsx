import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar/Navbar';
import Highlights from './components/highlights/Highlights';

function App() {
  return (
    <Box px={5} mx="auto" maxW="1402px">
      <Navbar />
      <Highlights />
    </Box>
  );
}

export default App;
