import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

function LoginModal({ isOpen, onClose }: any) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Hello</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            onClick={onOpen}
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
      <LoginModal isOpen={isOpen} onClose={onClose} />
    </nav>
  );
};
export default Navbar;
