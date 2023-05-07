import { Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react';
import { User } from 'react-feather';
import { Link } from 'react-router-dom';
import { UserState, logout } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';

interface props {
  user: UserState;
}

export default function UserInfoAvatar({ user }: props) {
  const dispatch = useDispatch();
  return (
    <>
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
          <Link to={'/addcoin'}>
            <MenuItem _hover={{ backgroundColor: 'rgba(0, 0, 0,0.1)' }}>
              <Text minW="100%" py="0.5rem">
                Add Coins
              </Text>
            </MenuItem>
          </Link>
          <Link to={'/portfolio'}>
            <MenuItem _hover={{ backgroundColor: 'rgba(0, 0, 0,0.1)' }}>
              <Text minW="100%" py="0.5rem">
                Portfolio
              </Text>
            </MenuItem>
          </Link>
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
    </>
  );
}
