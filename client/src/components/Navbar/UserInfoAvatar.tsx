import { Menu, MenuButton, MenuList, MenuItem, Text, Icon, Box, Flex, useColorMode } from '@chakra-ui/react';
import { UserState, logout } from '../../slices/userSlice';
import { AiOutlineProfile } from "react-icons/ai"
import { FaRegCircleUser } from "react-icons/fa6";
import { BiBitcoin, BiSolidSun } from "react-icons/bi";
import { HiMoon } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { FiLogOut } from "react-icons/fi"
import { Link } from 'react-router-dom';
import axios from 'axios';

interface props {
  user: UserState;
}

export default function UserInfoAvatar({ user }: props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();

  async function handleLogout() {
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, {
      withCredentials: true,
    });

    dispatch(logout());
  }

  return (
    <>
      <Box display={["none", "none", "flex"]} fontSize={"lg"} gap={[8, 8, 8, 14]} fontWeight={"semibold"}>
        <Flex
          alignItems={"center"}
          cursor={"pointer"}
          gap={2}
          onClick={() => toggleColorMode()}
          _hover={{
            color: colorMode === "light" ? "#8bc53f" : "#0facf0",
          }}>
          <Icon as={colorMode === "light" ? HiMoon : BiSolidSun} />
          <Text>{colorMode === "light" ? "dark" : "light"} mode</Text>
        </Flex>
        <Link to={'/addcoin'}>
          <Flex
            alignItems={"center"}
            cursor={"pointer"}
            gap={2}
            _hover={{
              color: colorMode === "light" ? "#8bc53f" : "#0facf0",
            }}>
            <Icon as={BiBitcoin} />
            <Text>Add Coin</Text>
          </Flex>
        </Link>
        <Link to={'/portfolio'}>
          <Flex
            alignItems={"center"}
            cursor={"pointer"}
            gap={2}
            _hover={{
              color: colorMode === "light" ? "#8bc53f" : "#0facf0",
            }}>
            <Icon as={AiOutlineProfile} />
            <Text>Portfolio</Text>
          </Flex>
        </Link>
        <Flex
          alignItems={"center"}
          cursor={"pointer"}
          gap={2}
          _hover={{
            color: colorMode === "light" ? "#8bc53f" : "#0facf0",
          }}>
          <Icon as={FiLogOut} />
          <Text
            onClick={() => dispatch(logout())}>
            Logout</Text>
        </Flex>
      </Box>
      <Box zIndex={200} display={["block", "block", "none"]}>
        <Menu>
          <MenuButton bg={colorMode === "light" ? "#8bc53f" : "#0facf0"} border={"2px solid"} borderRadius="100%" color={colorMode === "light" ? "#fff" : "#1a202c"}
            width={["2.5rem", "2.5rem", "2.8rem"]} height={["2.5rem", "2.5rem", "2.8rem"]}
            _hover={{
              background: colorMode === "light" ? "#fff" : "#1a202c",
              color: colorMode === "light" ? "#8bc53f" : "#0facf0"
            }}
            _active={{
              background: colorMode === "light" ? "#fff" : "#1a202c",
              color: colorMode === "light" ? "#8bc53f" : "#0facf0"
            }}>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
              <Icon as={FaRegCircleUser} fontSize={["1.3rem", "1.5rem"]} />
            </Box>
          </MenuButton>
          <MenuList p={0} borderRadius={"0.5rem"}>
            <MenuItem width={"full"}>
              <Text textTransform={"capitalize"} fontWeight={"semibold"} minW="100%" py="0.5rem" display={"flex"} justifyContent={"center"}>
                {user.name}
              </Text>
            </MenuItem>
            <MenuItem
              onClick={() => toggleColorMode()}
              _hover={{
                color: colorMode === "light" ? "#8bc53f" : "#0facf0",
              }}>
              <Flex alignItems={"center"} gap={4}>
                <Icon as={colorMode === "light" ? HiMoon : BiSolidSun} />
                <Text textTransform={"capitalize"}>{colorMode === "light" ? "dark" : "light"} mode</Text>
              </Flex>
            </MenuItem>
            <Link to={'/addcoin'}>
              <MenuItem
                _hover={{
                  color: colorMode === "light" ? "#8bc53f" : "#0facf0",
                }}>
                <Flex alignItems={"center"} gap={4}>
                  <Icon as={BiBitcoin} />
                  <Text minW="100%" py="0.5rem">
                    Add Coins
                  </Text>
                </Flex>
              </MenuItem>
            </Link>
            <Link to={'/portfolio'}>
              <MenuItem
                _hover={{
                  color: colorMode === "light" ? "#8bc53f" : "#0facf0",
                }}>
                <Flex alignItems={"center"} gap={4}>
                  <Icon as={AiOutlineProfile} />
                  <Text minW="100%" py="0.5rem">
                    Portfolio
                  </Text>
                </Flex>
              </MenuItem>
            </Link>
            <MenuItem
              onClick={() => dispatch(logout())}
              _hover={{
                color: colorMode === "light" ? "#8bc53f" : "#0facf0",
              }}>
              <Flex alignItems={"center"} gap={4}>
                <Icon as={FiLogOut} />
                <Text minW="100%" py="0.5rem" onClick={handleLogout}>
                  Logout
                </Text>
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box >
    </>
  );
}
