import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Box as="main" px={5} mx="auto" maxW="1402px">
      <Navbar />
      {/* <Highlights /> */}
    </Box>
  );
}

export default App;
