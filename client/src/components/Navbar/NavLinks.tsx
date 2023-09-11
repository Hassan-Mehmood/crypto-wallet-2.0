import { Button, Icon, Text, Flex, useColorMode } from '@chakra-ui/react';
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { BiSolidSun } from "react-icons/bi";
import { HiMoon } from "react-icons/hi";

interface props {
  onOpenLogin: () => void;
  onOpenSignup: () => void;
}

export default function NavLinks({ onOpenLogin, onOpenSignup }: props) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex alignItems="center" gap={{ base: 1, sm: 2, md: 4 }}>
      <Flex alignItems={"center"} cursor={"pointer"}
        onClick={() => toggleColorMode()}
        _hover={{
          color: colorMode === "light" ? "#8bc53f" : "#0facf0",
        }}>
        <Icon as={colorMode === "light" ? BiSolidSun : HiMoon} marginRight={{ md: "0.5rem" }} />
        <Text display={{ base: "none", md: "block" }} textTransform={"capitalize"}>{colorMode} mode</Text>
      </Flex>
      <Button
        onClick={onOpenLogin}
        borderRadius="8px"
        background="none"
        px={'0.7rem'}
        py={"1.3rem"}
        _hover={{
          color: colorMode === "light" ? "#8bc53f" : "#0facf0",
        }}
      >
        <Icon as={AiOutlineUserAdd} marginRight={"0.5rem"} />
        <Text>Log in</Text>
      </Button>
      <Button
        onClick={onOpenSignup}
        borderRadius="8px"
        color={colorMode === "light" ? "#fff" : "#1a202c"}
        background={colorMode === "light" ? "#8bc53f" : "#0facf0"}
        border={`1px solid ${colorMode === "light" ? "#8bc53f" : "#0facf0"}`}
        px={'0.7rem'}
        py={"1.3rem"}
        _hover={{
          background: 'none',
          color: colorMode === "light" ? "#8bc53f" : "#0facf0",
        }}
      >
        <Icon as={AiOutlineUser} marginRight={"0.5rem"} />
        <Text>Sign up</Text>
      </Button>
    </Flex>
  );
}
