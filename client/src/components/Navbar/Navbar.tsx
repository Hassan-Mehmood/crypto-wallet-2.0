import { Flex, Heading, useDisclosure } from '@chakra-ui/react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import UserInfoAvatar from './UserInfoAvatar';
const Navbar = () => {
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
  const { isOpen: isOpenSignup, onOpen: onOpenSignup, onClose: onCloseSignup } = useDisclosure();

  const user = useSelector((state: RootState) => state.userReducer);

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
          <Link to="/">Wallet Track</Link>
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
