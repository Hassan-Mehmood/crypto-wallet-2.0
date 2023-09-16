import { Box, Button, Flex, Image, Text, useColorMode, useToast } from '@chakra-ui/react';
import { SearchCoin } from '../../types';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

interface Props {
  coin: SearchCoin;
  setListState: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchedCoinName: React.Dispatch<React.SetStateAction<string>>;
}

const SearchedCoin = ({ coin, setListState, setSearchedCoinName }: Props) => {
  const { colorMode } = useColorMode();
  const toast = useToast();

  const queryClient = useQueryClient();

  const addCoin = useMutation(
    async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/portfolio/addCoin`,
        {
          coin,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        showToast('Success', 'Coin added to portfolio', 'success');
        queryClient.invalidateQueries('userCoins');
      },
      onError: () => {
        showToast('Error', 'Something went wrong', 'error');
      },
    }
  );

  function showToast(title: string, description: string, status: 'error' | 'success') {
    return toast({
      title,
      description,
      position: 'top',
      status,
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <Box p="0.5rem 1rem">
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={4}>
          <Image src={coin.thumb} maxW="1.5rem" />
          <Flex
            gap={2}
            alignItems={'baseline'}
            color={colorMode === 'light' ? '#8bc53f' : '#0facf0'}
          >
            <Text fontWeight="semibold">{coin.name}</Text>
            <Text fontSize={'sm'}>({coin.symbol})</Text>
          </Flex>
        </Flex>
        <Button
          fontSize="sm"
          borderRadius="0.3rem"
          color={colorMode === 'light' ? '#8bc53f' : '#0facf0'}
          background="none"
          px={'0.8rem'}
          onClick={() => addCoin.mutate()}
        >
          Add
        </Button>
      </Flex>
    </Box>
  );
};

export default SearchedCoin;
