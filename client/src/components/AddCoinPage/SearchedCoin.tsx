import { Box, Button, Flex, Image, Text, useColorMode } from '@chakra-ui/react';
import { SearchCoin } from '../../types';
import { useDispatch } from 'react-redux';
import { addCoin } from '../../slices/coinSlice';

interface Props {
  Coin: SearchCoin;
  setListState: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchedCoinName: React.Dispatch<React.SetStateAction<string>>;
}

const SearchedCoin = ({ Coin, setListState, setSearchedCoinName }: Props) => {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();

  return (
    <Box py="0.5rem">
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={4}>
          <Image src={Coin.thumb} maxW="1.5rem" />
          <Flex gap={2} alignItems={'baseline'}>
            <Text fontWeight="semibold">{Coin.name}</Text>
            <Text fontSize={'sm'}>({Coin.symbol})</Text>
          </Flex>
        </Flex>
        <Button
          fontSize="sm"
          borderRadius="0.3rem"
          color={colorMode === 'light' ? '#8bc53f' : '#0facf0'}
          background="none"
          px={'0.8rem'}
          onClick={() => {
            dispatch(addCoin(Coin));
            setListState(false);
            setSearchedCoinName('');
          }}
        >
          Add
        </Button>
      </Flex>
    </Box>
  );
};

export default SearchedCoin;
