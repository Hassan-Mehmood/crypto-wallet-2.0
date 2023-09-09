import { Menu, MenuButton, MenuList, MenuItem, Text, Icon, Box, Flex, useColorMode, Button } from '@chakra-ui/react';
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
        <Flex alignItems={"center"} cursor={"pointer"}
          onClick={() => toggleColorMode()}
          _hover={{
            color: "#8bc53f"
          }}>
          <Icon as={colorMode === "light" ? BiSolidSun : HiMoon} mr={"1rem"} />
          <Text>{colorMode} mode</Text>
        </Flex>
        <Link to={'/addcoin'}>
          <Flex alignItems={"center"} cursor={"pointer"}
            _hover={{
              color: "#8bc53f"
            }}>
            <Icon as={BiBitcoin} mr={"1rem"} />
            <Text>Add Coin</Text>
          </Flex>
        </Link>
        <Link to={'/portfolio'}>
          <Flex alignItems={"center"} cursor={"pointer"}
            _hover={{
              color: "#8bc53f"
            }}>
            <Icon as={AiOutlineProfile} mr={"1rem"} />
            <Text>Portfolio</Text>
          </Flex>
        </Link>
        <Flex alignItems={"center"} cursor={"pointer"}
          _hover={{
            color: "#8bc53f"
          }}>
          <Icon as={FiLogOut} mr={"1rem"} />
          <Text
            onClick={() => dispatch(logout())}>
            Logout</Text>
        </Flex>
      </Box>
      <Box zIndex={200} display={["block", "block", "none"]}>
        <Menu>
          <MenuButton bg="#8bc53f" border={"2px solid"} borderRadius="100%" color={"#fff"}
            width={["2.5rem", "2.5rem", "2.8rem"]} height={["2.5rem", "2.5rem", "2.8rem"]}
            _hover={{
              background: '#fff',
              color: "#8bc53f"
            }}
            _active={{
              background: '#fff',
              color: "#8bc53f"
            }}>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
              <Icon as={FaRegCircleUser} fontSize={["1.3rem", "1.5rem"]} />
            </Box>
          </MenuButton>
          <MenuList p={0} borderRadius={"0.5rem"}>
            <MenuItem _hover={{ backgroundColor: 'rgba(0, 0, 0,0.1)', borderTopRadius: "0.5rem" }} >
              <Box width={"full"}>
                <Text fontWeight={"semibold"} minW="100%" py="0.5rem" display={"flex"} justifyContent={"center"}>
                  {user.name}
                </Text>
              </Box>
            </MenuItem>
            <MenuItem
              onClick={() => toggleColorMode()}
              _hover={{ backgroundColor: 'rgba(0, 0, 0,0.1)' }}>
              <Flex alignItems={"center"}>
                <Icon as={colorMode === "light" ? BiSolidSun : HiMoon} mr={"1rem"} />
                <Text>{colorMode} mode</Text>
              </Flex>
            </MenuItem>
            <Link to={'/addcoin'}>
              <MenuItem _hover={{ backgroundColor: 'rgba(0, 0, 0,0.1)' }}>
                <Flex alignItems={"center"}>
                  <Icon as={BiBitcoin} mr={"1rem"} />
                  <Text minW="100%" py="0.5rem">
                    Add Coins
                  </Text>
                </Flex>
              </MenuItem>
            </Link>
            <Link to={'/portfolio'}>
              <MenuItem _hover={{ backgroundColor: 'rgba(0, 0, 0,0.1)' }}>
                <Flex alignItems={"center"}>
                  <Icon as={AiOutlineProfile} mr={"1rem"} />
                  <Text minW="100%" py="0.5rem">
                    Portfolio
                  </Text>
                </Flex>
              </MenuItem>
            </Link>
            <MenuItem
              _hover={{ backgroundColor: 'rgba(0, 0, 0,0.1)', borderBottomRadius: "0.5rem" }}
              onClick={() => dispatch(logout())}
            >
              <Flex alignItems={"center"}>
                <Icon as={FiLogOut} mr={"1rem"} />
                <Text minW="100%" py="0.5rem" onClick={handleLogout}>
                  Logout
                </Text>
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </>
  );
}
