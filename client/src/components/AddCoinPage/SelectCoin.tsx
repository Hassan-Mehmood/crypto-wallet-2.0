import { Box, FormControl, Heading, Icon, Input } from '@chakra-ui/react';
import { getCoinByName } from '../../api/axios';
import { useState, useEffect } from 'react';
import { SearchCoin } from '../../types';
import { GrSearch } from "react-icons/gr"
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
    <Box border="1px solid black" borderRadius={"0.7rem"} p="1rem" height="8.3rem">
      <Box>
        <Heading as="h6" size="md" mb="1.5rem" fontWeight={"semibold"}>
          Select The Coin
        </Heading>
        <FormControl position={"relative"}>
          <form>
            <Icon as={GrSearch} position={"absolute"} fontSize={"1.4rem"} top={"50%"} left={"6%"} transform={"translate(-50%, -50%)"}/>
            <Input
              type="email"
              border="1px solid black"
              w="100%"
              p=".5rem"
              pl={"2.2rem"}
              h="40px"
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
