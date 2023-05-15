import { Box, FormControl, Heading, Input } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { SearchCoin } from '../../types';
import { getCoinByName } from '../../api/axios';
import SearchedCoin from './SearchedCoin';

export default function SelectCoin() {
  const [searchedCoinName, setSearchedCoinName] = useState('');
  const [coinData, setCoinData] = useState<SearchCoin[]>([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchedCoinName.length > 0) {
        getCoinByName(searchedCoinName).then((data) => setCoinData(data));
      } else {
        setCoinData([]);
      }
    }, 250);

    return () => clearTimeout(delay);
  }, [searchedCoinName]);

  return (
    <Box border="1px solid black" p="1rem" maxW="600px" w="100%" minH="100%">
      <Box>
        <Heading as="h6" size="md" mb="2rem">
          Select a coin
        </Heading>
        <FormControl>
          <form>
            <Input
              type="email"
              border="1px solid black"
              w="100%"
              p=".5rem"
              h="35px"
              value={searchedCoinName}
              onChange={(e) => setSearchedCoinName(e.target.value)}
            />
          </form>
        </FormControl>
      </Box>
      <Box>
        {coinData.map((coin) => (
          <SearchedCoin key={coin.id} Coin={coin} />
        ))}
      </Box>
    </Box>
  );
}
