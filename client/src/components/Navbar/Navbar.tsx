import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { User } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../slices/userSlice';

const Navbar = () => {
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
  const { isOpen: isOpenSignup, onOpen: onOpenSignup, onClose: onCloseSignup } = useDisclosure();

  const user = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

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
        {user.id !== null ? (
          <Menu>
            <MenuButton bg="rgba(0, 0, 0, 0.2)" p={3} borderRadius="50%">
              <User size={24} />
            </MenuButton>
            <MenuList p={0}>
              <MenuItem _hover={{ backgroundColor: 'rgba(0, 0, 0,0.1)' }}>
                <Text minW="100%" py="0.5rem">
                  {user.name}
                </Text>
              </MenuItem>
              <MenuItem _hover={{ backgroundColor: 'rgba(0, 0, 0,0.1)' }}>
                <Text minW="100%" py="0.5rem">
                  {user.email}
                </Text>
              </MenuItem>
              <MenuItem
                _hover={{ backgroundColor: 'rgba(0, 0, 0,0.1)' }}
                onClick={() => dispatch(logout())}
              >
                <Text minW="100%" py="0.5rem">
                  Logout
                </Text>
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Box display="flex" alignItems="center">
            <Button
              onClick={onOpenLogin}
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
              onClick={onOpenSignup}
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
        )}
      </Flex>
      <LoginModal isOpen={isOpenLogin} onClose={onCloseLogin} />
      <SignupModal isOpen={isOpenSignup} onClose={onCloseSignup} />
    </nav>
  );
};
export default Navbar;
