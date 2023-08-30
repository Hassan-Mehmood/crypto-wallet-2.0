import { Button, Box, Icon, Text } from '@chakra-ui/react';
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";

interface props {
  onOpenLogin: () => void;
  onOpenSignup: () => void;
}

export default function NavLinks({ onOpenLogin, onOpenSignup }: props) {
  return (
    <Box display="flex" alignItems="center">
      <Button
        onClick={onOpenSignup}
        borderRadius="8px"
        color="#fff"
        background="#8bc53f"
        border="1px solid #8bc53f"
        px={'0.7rem'}
        py={"1.3rem"}
        _hover={{
          background: 'none',
          color: "#8bc53f",
        }}
      >
        <Icon as={AiOutlineUser} marginRight={"0.5rem"} />
        <Text>Sign up</Text>
      </Button>
      <Button
        onClick={onOpenLogin}
        borderRadius="8px"
        background="none"
        px={'0.7rem'}
        py={"1.3rem"}
        _hover={{
          color: "#8bc53f"
        }}
      >
        <Icon as={AiOutlineUserAdd} marginRight={"0.5rem"} />
        <Text>Log in</Text>
      </Button>
    </Box>
  );
}
