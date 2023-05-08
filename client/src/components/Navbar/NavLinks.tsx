import { Button, Box } from '@chakra-ui/react';

interface props {
  onOpenLogin: () => void;
  onOpenSignup: () => void;
}

export default function NavLinks({ onOpenLogin, onOpenSignup }: props) {
  return (
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
  );
}
