import {
  Button,
  Flex,
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
  Text,
  useColorMode,
} from '@chakra-ui/react';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getCoinHoldingQuantity, getCoinMarketData } from '../../api/axios';
import useCustomToast from '../../hooks/useCustomToast';
import { UserTransactionsData } from '../../types';
import { removeCoin } from '../../slices/coinSlice';

interface props {
  isOpen: boolean;
  onClose: () => void;
}

export default function TransactionModal({ isOpen, onClose }: props) {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [pricePerCoin, setPricePerCoin] = useState('0');
  const [coinQuantity, setCoinQuantity] = useState('0');
  const [coinHoldingQuantity, setCoinHoldingQuantity] = useState(0);
  const [transactionDate, setTransactionDate] = useState('');

  const { colorMode } = useColorMode();
  const showToast = useCustomToast();

  const coinData = useSelector((state: RootState) => state.searchCoinReducer);
  const userData = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const userPortfolioData = queryClient.getQueryData<UserTransactionsData>('userCoins');

  const buyCoin = useMutation(
    async () => {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/portfolio/buy`, {
        user: userData.id,
        coin: coinData,
        coinPrice: pricePerCoin,
        coinQuantity: coinQuantity,
        transactionDate: transactionDate,
        type: 'BUY',
      });
      return response.data;
    },
    {
      onMutate: () => setLoadingBtn(true),
      onSettled: () => setLoadingBtn(false),

      onSuccess: () => {
        showToast({ title: 'Success', description: 'Coin bought successfully', status: 'success' });
        queryClient.invalidateQueries('userCoins');
        fetchCoinHoldings();
      },
      onError: () => {
        showToast({ title: 'Error', description: 'Something went wrong', status: 'error' });
      },
    }
  );

  const sellCoin = useMutation(
    async () => {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/portfolio/sell`, {
        user: userData.id,
        coin: coinData,
        coinQuantity,
        coinPrice: pricePerCoin,
        transactionDate: transactionDate,
        type: 'SELL',
      });
      return response.data;
    },

    {
      onMutate: () => setLoadingBtn(true),
      onSettled: () => setLoadingBtn(false),

      onSuccess: () => {
        showToast({ title: 'Success', description: 'Coin sold successfully', status: 'success' });
        queryClient.invalidateQueries('userCoins');
        fetchCoinHoldings();
      },
      onError: () => {
        showToast({ title: 'Error', description: 'Something went wrong', status: 'error' });
      },
    }
  );

  function validateFormData(quantity: number, price: number) {
    if (!quantity || !price) {
      showToast({
        title: 'Error',
        description: 'Incorrect price or quantity',
        status: 'error',
      });
      return false;
    }

    const inputDate = new Date(transactionDate);
    const currentDate = new Date();

    if (!transactionDate) {
      showToast({
        title: 'Error',
        description: 'Transaction date is required',
        status: 'error',
      });
      return false;
    }

    if (inputDate > currentDate) {
      showToast({
        title: 'Error',
        description: 'Transaction date must be in the past',
        status: 'error',
      });
      return false;
    }

    return true;
  }

  function handleBuyFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const quantity = parseFloat(coinQuantity);
    const price = parseFloat(pricePerCoin);

    if (!validateFormData(quantity, price)) {
      return;
    }

    if (userPortfolioData?.dollerBalance && quantity * price > userPortfolioData?.dollerBalance) {
      showToast({
        title: 'Error',
        description: 'You do not have enough money to buy this coin',
        status: 'error',
      });
      return;
    }

    buyCoin.mutate();
  }

  function handleSellFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const quantity = parseFloat(coinQuantity);
    const price = parseFloat(pricePerCoin);

    if (!validateFormData(quantity, price)) {
      return;
    }

    if (quantity > coinHoldingQuantity) {
      showToast({
        title: 'Error',
        description: 'You do not have enough coins to sell this coin',
        status: 'error',
      });
      return;
    }

    sellCoin.mutate();
  }

  const fetchCoinHoldings = useCallback(() => {
    if (!coinData.apiId) {
      return;
    }
    console.log('Fetch coin holdings');
    getCoinHoldingQuantity(coinData.apiId).then((res) => {
      const quantity = res.holdingsInPortfolio;

      setCoinHoldingQuantity(quantity);
    });
  }, [coinData.apiId]);

  useEffect(() => {
    if (!isOpen) {
      dispatch(removeCoin());
    }
  }, [dispatch, isOpen]);

  useEffect(() => {
    if (isOpen) {
      let isMounted = true;

      if (!coinData?.apiId) {
        setPricePerCoin('0');
        return;
      }

      if (!isMounted) return;
      getCoinMarketData(coinData.apiId).then((res) => {
        const marketData = res.market_data;

        if (!marketData) return;
        setPricePerCoin(marketData.current_price?.usd.toString() || '0');
      });

      if (!isMounted) return;
      fetchCoinHoldings();
    }
  }, [coinData.apiId, fetchCoinHoldings, dispatch, isOpen]);

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
                    <FormLabel>Quantity {coinData.symbol}</FormLabel>
                    <Input value={coinQuantity} onChange={(e) => setCoinQuantity(e.target.value)} />
                  </FormControl>
                  <FormControl mt={'1.5rem'}>
                    <FormLabel>Total Spent (USD)</FormLabel>
                    <Input
                      value={parseFloat(pricePerCoin) * parseFloat(coinQuantity) || '0'}
                      readOnly
                    />
                  </FormControl>
                  <FormControl mt={'1.5rem'}>
                    <FormLabel>Date</FormLabel>
                    <Input
                      placeholder="Select Date and Time"
                      type="date"
                      onChange={(e) => setTransactionDate(e.target.value)}
                    />
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
                    <FormLabel>Quantit {coinData.symbol}</FormLabel>
                    <Input value={coinQuantity} onChange={(e) => setCoinQuantity(e.target.value)} />
                  </FormControl>
                  <FormControl mt={'1.5rem'}>
                    <Flex justify="space-between" alignItems="center">
                      <FormLabel display="inline-block">Total Recieved (USD)</FormLabel>
                      <Text as="span" display="inline-block" mb="8px">
                        Balance: {coinHoldingQuantity || '0'} {coinData.symbol}
                      </Text>
                    </Flex>
                    <Input
                      value={parseFloat(pricePerCoin) * parseFloat(coinQuantity) || '0'}
                      readOnly
                    />
                  </FormControl>
                  <FormControl mt={'1.5rem'}>
                    <FormLabel>Date</FormLabel>
                    <Input
                      placeholder="Select Date and Time"
                      type="date"
                      onChange={(e) => setTransactionDate(e.target.value)}
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    isLoading={loadingBtn}
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
