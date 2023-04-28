import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Eye, EyeOff } from 'react-feather';

function UserForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form>
      <FormControl>
        <FormLabel fontWeight="semibold">Name</FormLabel>
        <Input type="text" placeholder="Enter your name" />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel fontWeight="semibold">Email address</FormLabel>
        <Input type="email" placeholder="Enter your email address" />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel fontWeight="semibold">Password</FormLabel>
        <InputGroup>
          <Input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" />
          <InputRightElement mr={1}>
            <Button h="1.75rem" size="sm" onClick={togglePasswordVisibility}>
              {showPassword ? <Eye /> : <EyeOff />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </form>
  );
}

function LoginModal({ isOpen, onClose }: any) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UserForm />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const SignupModal = ({ isOpen, onClose }: any) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Signup</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const Navbar = () => {
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isSignupOpen, onOpen: onSignupOpen, onClose: onSignupClose } = useDisclosure();

  return (
    <nav>
      <Flex
        justify="space-between"
        align="center"
        direction={['column', 'row']}
        py={['1rem']}
        minH="75px"
      >
        <Heading fontSize="1.4rem" mb={['0.75rem']} cursor="pointer">
          Wallet Track
        </Heading>
        <Box display="flex" alignItems="center">
          <Button
            onClick={onLoginOpen}
            fontSize="sm"
            border="1px solid rgb(105, 162, 53)"
            borderRadius="8px"
            background="none"
            padding={'0 16px'}
            mr="1rem"
            _hover={{
              background: 'rgb(105, 162, 53)',
              color: '#fff',
              border: '1px solid rgb(105, 162, 53)',
            }}
          >
            Log in
          </Button>
          <Button
            onClick={onSignupOpen}
            fontSize="sm"
            borderRadius="8px"
            color="#fff"
            background="rgb(105, 162, 53)"
            padding={'0 16px'}
            border="1px solid rgb(105, 162, 53)"
            _hover={{
              background: 'rgb(81, 126, 39)',
            }}
          >
            Sign up
          </Button>
        </Box>
      </Flex>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignupModal isOpen={isSignupOpen} onClose={onSignupClose} />
    </nav>
  );
};
export default Navbar;
