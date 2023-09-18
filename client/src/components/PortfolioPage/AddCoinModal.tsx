import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  useColorMode,
  Input,
  Box,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getCoinByName } from '../../api/axios';
import { SearchCoin } from '../../types';
import SearchedCoin from './SearchedCoin';

// import { useQuery, useQueryClient } from 'react-query';

interface props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCoinModal({ isOpen, onClose }: props) {
  const [searchedCoinName, setSearchedCoinName] = useState('');
  const [listState, setListState] = useState(false);
  const [coinData, setCoinData] = useState<SearchCoin[]>([]);

  const { colorMode } = useColorMode();

  // const { data: trendingCoins } = useQuery('trendingCoin_inModal', getTrendingCoins);

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
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent width={'25.6rem'} py={'1rem'}>
        <ModalHeader>Search for your favourite coin</ModalHeader>
        <ModalCloseButton position={'absolute'} right={'0.8rem'} top={'2rem'} />

        <ModalBody>
          <FormControl mt={'0.5rem'}>
            <Input value={searchedCoinName} onChange={(e) => setSearchedCoinName(e.target.value)} />
          </FormControl>

          {listState && coinData.length > 0 && (
            <Box
              backgroundColor={colorMode === 'light' ? '#fff' : '#2d3748'}
              border={colorMode === 'light' ? '1px solid #d1d5db' : '1px solid #4b5563'}
              borderBottomRadius={'0.5rem'}
              mt="0.25rem"
            >
              <Box py={'0.5rem'}>
                {coinData.slice(0, 7).map((coin) => (
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
