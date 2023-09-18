import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getCoinByName, getCoinMarketData } from '../../api/axios';
import { removeCoin } from '../../slices/coinSlice';

interface props {
  isOpen: boolean;
  onClose: () => void;
  coinName: string | null;
  coinId: number | null;
}

export default function TransactionModal({ isOpen, onClose, coinName, coinId }: props) {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [pricePerCoin, setPricePerCoin] = useState('0');
  const [coinQuantity, setCoinQuantity] = useState('0');

  const { colorMode } = useColorMode();

  const coinData = useSelector((state: RootState) => state.searchCoinReducer);
  const userData = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();

  const buyCoin = useMutation(
    async () => {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/portfolio/buy`, {
        user: userData.id,
        coin: coinData,
        coinPrice: pricePerCoin,
        coinQuantity,
        type: 'BUY',
      });
      return response.data;
    },
    {
      onMutate: () => setLoadingBtn(true),
      onSettled: () => setLoadingBtn(false),

      onSuccess: () => {
        // showToast('Success', 'Coin bought successfully', 'success');
        // refetchBalance();
      },
      onError: () => {
        // showToast('Error', 'Something went wrong', 'error');
      },
    }
  );

  const sellCoin = useMutation(
    async () => {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/portfolio/sell`, {
        user: userData.id,
        coin: coinData,
        coinQuantity,
        coinPrice: pricePerCoin, // This is the price @ which the coin was sold
        type: 'SELL',
      });
      return response.data;
    },

    {
      onMutate: () => setLoadingBtn(true),
      onSettled: () => setLoadingBtn(false),

      onSuccess: () => {
        // showToast('Success', 'Coin sold successfully', 'success');
        // refetchBalance();
      },
      onError: () => {
        // showToast('Error', 'Something went wrong', 'error');
      },
    }
  );

  function handleBuyFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const quantity = parseFloat(coinQuantity);
    const price = parseFloat(pricePerCoin);

    if (quantity && price) {
      buyCoin.mutate();
    } else {
      console.log('Error');
    }
  }
  function handleSellFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const quantity = parseFloat(coinQuantity);
    const price = parseFloat(pricePerCoin);

    if (quantity && price) {
      sellCoin.mutate();
    } else {
      console.log('Error');
    }
  }

  useEffect(() => {
    let isMounted = true;

    if (!coinData?.id) {
      setPricePerCoin('0');
      return;
    }

    getCoinMarketData(coinData.id).then((res) => {
      if (!isMounted) return;

      const marketData = res.market_data;

      if (!marketData) return;

      setPricePerCoin(marketData.current_price?.usd.toString() || '0');
    });

    // refetchCoinQuantity();

    return () => {
      isMounted = false;
      dispatch(removeCoin());
    };
  }, [coinData.id, dispatch]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent width={'25.6rem'} py={'1rem'}>
        <ModalHeader>Add transaction</ModalHeader>
        <ModalCloseButton position={'absolute'} right={'0.8rem'} top={'2rem'} />

        <ModalBody>
          <Tabs position="relative" isFitted variant="unstyled">
            <TabList>
              <Tab>Buy</Tab>
              <Tab>Sell</Tab>
            </TabList>
            <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
            <TabPanels>
              <TabPanel>
                {/* BUY */}
                <form onSubmit={handleBuyFormSubmit}>
                  <FormControl mt={'1rem'}>
                    <FormLabel>Price per coin</FormLabel>
                    <Input value={pricePerCoin} onChange={(e) => setPricePerCoin(e.target.value)} />
                  </FormControl>
                  <FormControl mt={'1.5rem'}>
                    <FormLabel>Quantity</FormLabel>
                    <Input value={coinQuantity} onChange={(e) => setCoinQuantity(e.target.value)} />
                  </FormControl>
                  <FormControl mt={'1.5rem'}>
                    <FormLabel>Total Spent</FormLabel>
                    <Input value={parseFloat(pricePerCoin) * parseFloat(coinQuantity)} readOnly />
                  </FormControl>
                  <FormControl mt={'1.5rem'}>
                    <FormLabel>Date</FormLabel>
                    <Input value="" onChange={(e) => ''} />
                  </FormControl>

                  <Button
                    // onClick={(e) => buyTransaction(e)}
                    isLoading={loadingBtn}
                    type="submit"
                    fontSize="md"
                    borderRadius="0.3rem"
                    color={colorMode === 'light' ? '#8bc53f' : '#0facf0'}
                    backgroundColor={colorMode === 'light' ? '#fff' : '#2d3748'}
                    border={`1px solid ${colorMode === 'light' ? '#8bc53f' : '#0facf0'}`}
                    margin="1rem 0.5rem 0 0"
                    padding="0.5rem 1.5rem"
                    width="100%"
                    _hover={{
                      background: 'none',
                    }}
                  >
                    Submit
                  </Button>
                </form>
              </TabPanel>
              <TabPanel>
                {/* SELL */}
                <form onSubmit={handleSellFormSubmit}>
                  <FormControl mt={'1rem'}>
                    <FormLabel>Price per coin</FormLabel>
                    <Input value={pricePerCoin} onChange={(e) => setPricePerCoin(e.target.value)} />
                  </FormControl>
                  <FormControl mt={'1.5rem'}>
                    <FormLabel>Quantity</FormLabel>
                    <Input value={coinQuantity} onChange={(e) => setCoinQuantity(e.target.value)} />
                  </FormControl>
                  <FormControl mt={'1.5rem'}>
                    <FormLabel>Total Spent</FormLabel>
                    <Input value={parseFloat(pricePerCoin) * parseFloat(coinQuantity)} readOnly />
                  </FormControl>
                  <FormControl mt={'1.5rem'}>
                    <FormLabel>Date</FormLabel>
                    <Input value="" onChange={(e) => ''} />
                  </FormControl>

                  <Button
                    // onClick={(e) => buyTransaction(e)}
                    isLoading={loadingBtn}
                    type="submit"
                    fontSize="md"
                    borderRadius="0.3rem"
                    color={colorMode === 'light' ? '#8bc53f' : '#0facf0'}
                    backgroundColor={colorMode === 'light' ? '#fff' : '#2d3748'}
                    border={`1px solid ${colorMode === 'light' ? '#8bc53f' : '#0facf0'}`}
                    margin="1rem 0.5rem 0 0"
                    padding="0.5rem 1.5rem"
                    width="100%"
                    _hover={{
                      background: 'none',
                    }}
                  >
                    Submit
                  </Button>
                </form>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
