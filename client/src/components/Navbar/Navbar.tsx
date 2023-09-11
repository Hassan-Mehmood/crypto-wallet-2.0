import { Flex, Heading, useDisclosure, Icon, Text, useColorMode } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../slices/userSlice';
import { getUserStatus } from '../../api/axios';
import { PiWalletLight } from "react-icons/pi";
import { RootState } from '../../store';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import UserInfoAvatar from './UserInfoAvatar';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import NavLinks from './NavLinks';

const Navbar = () => {
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
  const { isOpen: isOpenSignup, onOpen: onOpenSignup, onClose: onCloseSignup } = useDisclosure();
  const { colorMode } = useColorMode();

  const user = useSelector((state: RootState) => state.userReducer);

  const dispatch = useDispatch();
  useQuery('user', getUserStatus, {
    onSuccess: (data) => {
      const { id, name, _email: email } = data;
      dispatch(login({ id, name, email }));
    },
    onError: () => {
      dispatch(logout());
    },
  });

  return (
    <nav>
      <Flex
        justify="space-between"
        align="center"
        py={{ base: '1rem', md: '1.5rem' }}
        mb={{ base: "2rem", md: "3rem" }}
        borderBottom={`1px solid ${colorMode === "light" ? "#000" : "#fff"}`}
      >
        <Link to="/" >
          <Heading fontSize="1.4rem" cursor="pointer">
            <Flex align={"center"} gap={2}>
              <Icon as={PiWalletLight} fontSize={"1.75rem"} color={colorMode === "light" ? "#8bc53f" : "#0facf0"} />
              <Text>Wallet Track</Text>
            </Flex>
          </Heading>
        </Link>
        {user.id !== null ? (
          <UserInfoAvatar user={user} />
        ) : (
          <NavLinks onOpenLogin={onOpenLogin} onOpenSignup={onOpenSignup} />
        )}
      </Flex>
      <LoginModal isOpen={isOpenLogin} onClose={onCloseLogin} />
      <SignupModal isOpen={isOpenSignup} onClose={onCloseSignup} />
    </nav>
  );
};
export default Navbar;
