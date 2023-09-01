import { Box, Divider, FormControl, Heading, Icon, Input, border } from '@chakra-ui/react';
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
    <Box zIndex={100} border="1px solid black" borderRadius={"0.7rem"} p="1rem" height="8.3rem" mb={"2rem"} width={["25.5rem", "28rem", "36rem", "40rem"]}>
      <Box>
        <Heading as="h6" size="md" mb="1.5rem" fontWeight={"semibold"}>
          Select The Coin
        </Heading>
        <FormControl position={"relative"}>
          <form>
            <Icon as={GrSearch} position={"absolute"} fontSize={"1.4rem"} top={"50%"} left={"1.7rem"} transform={"translate(-50%, -50%)"} />
            <input style={{
              border: "1px solid black",
              borderBottom: `${coinData.length > 0 ? "0px" : "1px solid"}`,
              borderTopRightRadius: "0.5rem",
              borderTopLeftRadius: "0.5rem",
              borderBottomLeftRadius: `${coinData.length > 0 ? "0px" : "0.5rem"}`,
              borderBottomRightRadius: `${coinData.length > 0 ? "0px" : "0.5rem"}`,
              width: "100%",
              padding: "0.5rem",
              paddingLeft: "2.8rem",
              outline: "none"
            }}

              value={searchedCoinName}
              onChange={(e) => setSearchedCoinName(e.target.value)}
            />
          </form>
        </FormControl>
      </Box>
      {coinData.length > 0 && (
        <Box backgroundColor={"white"} border={"1px"} borderTop={"0px"} borderBottomRadius={"0.5rem"} px={"1rem"}>
          <Divider />
          <Box py={"0.5rem"}>
            {coinData.slice(0, 5).map((coin) => (
              <SearchedCoin key={coin.id} Coin={coin} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
