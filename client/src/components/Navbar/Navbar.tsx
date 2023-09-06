import { Flex, Heading, useDisclosure, Icon, Text } from '@chakra-ui/react';
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
        direction='row'
        py={{base:'1rem', md:'1.5rem'}}
        mb={{base: "2rem", md: "3rem"}}
        borderBottom={"1px solid #000"}
      >
        <Heading fontSize="1.4rem" cursor="pointer">
          <Link to="/" >
            <Flex align={"center"}>
              <Icon as={PiWalletLight} marginRight={"0.5rem"} fontSize={"1.75rem"} color={"#8bc53f"}/>
              <Text>Wallet Track</Text>
            </Flex>
          </Link>
        </Heading>
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
