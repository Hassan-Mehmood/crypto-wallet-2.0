import { Box, Button, Flex, Heading } from '@chakra-ui/react';
// import { useState } from 'react';
// import { FaUserCircle } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// import Login from '../Login/Login';
// import Signup from '../Signup/Signup';
// import useCheckCurrentUser from '../../Hooks/useCheckCurrentUser';

const Navbar = () => {
  // const [showSignup, setShowSignup] = useState<boolean>(false);
  // const [showLogin, setShowLogin] = useState<boolean>(false);
  // const navigate = useNavigate();

  // const { currentUser } = useCheckCurrentUser();

  // const handleSignupModal = (e: React.MouseEvent<HTMLElement>) => {
  //   e.preventDefault();
  //   setShowSignup(true);
  // };

  // const handleLoginModal = (e: React.MouseEvent<HTMLElement>) => {
  //   e.preventDefault();
  //   setShowLogin(true);
  // };

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
            // onClick={(e) => handleLoginModal(e)}
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
            // onClick={(e) => handleSignupModal(e)}
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
        {/* {showSignup && <Signup setShowLogin={setShowLogin} setShowSignup={setShowSignup} />} */}
        {/* {showLogin && <Login setShowLogin={setShowLogin} setShowSignup={setShowSignup} />} */}
      </Flex>
    </nav>
  );
};
export default Navbar;
