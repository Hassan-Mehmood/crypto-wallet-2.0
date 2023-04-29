import { Box, useDisclosure } from '@chakra-ui/react';
import Navbar from './components/Navbar/Navbar';
import Highlights from './components/highlights/Highlights';
import LoginModal from './components/Navbar/LoginModal';
import SignupModal from './components/Navbar/SignupModal';

function App() {
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
  const { isOpen: isOpenSignup, onOpen: onOpenSignup, onClose: onCloseSignup } = useDisclosure();

  return (
    <Box as="main" px={5} mx="auto" maxW="1402px">
      <Navbar onLoginOpen={onOpenLogin} onSignupOpen={onOpenSignup} />
      <LoginModal isOpen={isOpenLogin} onClose={onCloseLogin} />
      <SignupModal isOpen={isOpenSignup} onClose={onCloseSignup} />
      <Highlights />
    </Box>
  );
}

export default App;
