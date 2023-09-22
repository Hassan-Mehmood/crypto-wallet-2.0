import { Box, FormControl, Heading, Icon, useColorMode } from '@chakra-ui/react';
import { getCoinByName } from '../../api/axios';
import { useState, useEffect, useRef } from 'react';
import { SearchCoin } from '../../types';
import { BiSearch } from 'react-icons/bi';
import SearchedCoin from './SearchedCoin';

export default function SelectCoin() {
  const [searchedCoinName, setSearchedCoinName] = useState('');
  const [listState, setListState] = useState(false);
  const [coinData, setCoinData] = useState<SearchCoin[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { colorMode } = useColorMode();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchedCoinName.length > 0) {
        getCoinByName(searchedCoinName).then((data) => {
          setCoinData(data);
          setListState(true);
        });
      } else {
        setCoinData([]);
        setListState(false);
      }
    }, 250);

    return () => clearTimeout(delay);
  }, [searchedCoinName]);

  return (
    <Box
      zIndex={100}
      border={colorMode === 'light' ? '1px solid black' : 'none'}
      borderRadius={'0.5rem'}
      px={['1rem', '1rem', '1.7rem']}
      py={['1rem', '1.2rem']}
      height="8.3rem"
      mb={'2rem'}
      width={['25.5rem', '28rem', '36rem']}
      backgroundColor={colorMode === 'light' ? 'none' : '#2d3748'}
    >
      <Box>
        <Heading size="md" mb="1.2rem" fontWeight={'semibold'}>
          Select The Coin
        </Heading>
        <FormControl position={'relative'}>
          <form>
            <Icon
              as={BiSearch}
              position={'absolute'}
              fontSize={'1.4rem'}
              top={'50%'}
              left={'1.7rem'}
              transform={'translate(-50%, -50%)'}
            />
            <input
              ref={inputRef}
              style={{
                border: `1px solid ${colorMode === 'light' ? '#000' : '#fff'}`,
                borderTopRightRadius: '0.5rem',
                borderTopLeftRadius: '0.5rem',
                backgroundColor: colorMode === 'light' ? '#fff' : '#2d3748',
                borderBottomLeftRadius: coinData.length > 0 && listState ? '0px' : '0.5rem',
                borderBottomRightRadius: coinData.length > 0 && listState ? '0px' : '0.5rem',
                width: '100%',
                padding: '0.5rem',
                paddingLeft: '2.8rem',
                outline: 'none',
              }}
              value={searchedCoinName}
              onChange={(e) => setSearchedCoinName(e.target.value)}
            />
          </form>
        </FormControl>
      </Box>

      {listState && coinData.length > 0 && (
        <Box
          backgroundColor={colorMode === 'light' ? '#fff' : '#2d3748'}
          border={'1px'}
          borderTop={'0px'}
          borderBottomRadius={'0.5rem'}
        >
          <Box py={'0.5rem'}>
            {coinData.slice(0, 5).map((coin) => (
              <Box _hover={{ backgroundColor: '#262e3e' }} key={coin.id}>
                <SearchedCoin
                  coin={coin}
                  setListState={setListState}
                  setSearchedCoinName={setSearchedCoinName}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
