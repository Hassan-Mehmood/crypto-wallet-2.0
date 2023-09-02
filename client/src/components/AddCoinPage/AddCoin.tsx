import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Button,
  Box,
  Image,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { removeCoin } from '../../slices/coinSlice';
import { useEffect, useState } from 'react';
import { getCoinMarketData, getUserBalance } from '../../api/axios';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';

export default function AddCoin() {
  const [coinQuantity, setCoinQuantity] = useState<string>('0');
  const [coinPrice, setCoinPrice] = useState<string>('0');

  const coinData = useSelector((state: RootState) => state.searchCoinReducer);
  const userData = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  const toast = useToast();

  const { data: accountBalance, refetch: refetchBalance } = useQuery(
    'accountBalance',
    getUserBalance
  );

  const buyCoin = useMutation(
    async () => {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/portfolio/buy`, {
        user: userData.id,
        coin: coinData,
        coinQuantity,
        coinPrice,
        type: 'BUY',
      });
      return response.data;
    },
    {
      onSuccess: () => {
        showToast('Success', 'Coin bought successfully', 'success');
        refetchBalance();
      },
      onError: () => {
        showToast('Error', 'Something went wrong', 'error');
      },
    }
  );

  const sellCoin = useMutation(
    async () => {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/portfolio/sell`, {
        user: userData.id,
        coin: coinData,
        coinQuantity,
        coinPrice, // This is the price @ which the coin was sold
        type: 'SELL',
      });
      return response.data;
    },
    {
      onSuccess: () => {
        showToast('Success', 'Coin sold successfully', 'success');
        refetchBalance();
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

  const handleQuantityInput = (value: string) => {
    const valueNumber = parseFloat(value);
    if (isNaN(valueNumber)) {
      setCoinQuantity('0');
      return;
    }
    setCoinQuantity(value);
  };

  const handlePriceInput = (value: string) => {
    const valueNumber = parseFloat(value);
    if (isNaN(valueNumber)) {
      setCoinPrice('0');
      return;
    }
    setCoinPrice(value);
  };

  useEffect(() => {
    let isMounted = true;

    if (!coinData.id) {
      setCoinPrice('0');
      return;
    }

    getCoinMarketData(coinData.id).then((res) => {
      if (!isMounted) return;

      const marketData = res.market_data;

      if (!marketData) return;

      setCoinPrice(marketData.current_price?.usd.toString() || '0');
    });

    return () => {
      isMounted = false;
      dispatch(removeCoin());
    };
  }, [coinData.id, dispatch]);

  function buyTransaction(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!accountBalance) {
      showToast('Error', 'Something went wrong', 'error');
      return;
    }

    if (parseFloat(coinPrice) * parseFloat(coinQuantity) > accountBalance.dollerBalance) {
      showToast('Error', 'Insufficient funds', 'error');
      return;
    }

    buyCoin.mutate();
  }

  function sellTransaction(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!accountBalance) {
      showToast('Error', 'Something went wrong', 'error');
      return;
    }

    if (parseFloat(coinPrice) * parseFloat(coinQuantity) > accountBalance.dollerBalance) {
      showToast('Error', 'Insufficient funds', 'error');
      return;
    }

    sellCoin.mutate();
  }

  return (
    <Box border="1px solid black" p="1rem" maxW="600px" w="100%">
      <Flex justifyContent="space-between">
        <Heading as="h6" size="md" mb="2rem">
          Add Coin
        </Heading>
        <Heading as="h6" size="md" mb="2rem">
          <>Balance: ${accountBalance?.dollerBalance || 0}</>
        </Heading>
      </Flex>
      <Flex align="center" mb="1rem">
        <Image src={coinData.thumb ? coinData.thumb : ''} />
        <Heading as="h6" size="sm" textTransform="capitalize" ml=".5rem">
          {coinData.name || 'No coin selected'}
        </Heading>
      </Flex>
      <form>
        <Flex gap="1rem">
          <FormControl>
            <FormLabel>Quantity</FormLabel>
            <NumberInput
              step={0.01}
              precision={2}
              min={0}
              value={coinQuantity}
              onChange={(valueString) => handleQuantityInput(valueString)}
            >
              <NumberInputField h="35px" border="1px solid black" p=".5rem" />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <NumberInput
              step={0.01}
              precision={2}
              value={coinPrice}
              onChange={(valueString) => handlePriceInput(valueString)}
            >
              <NumberInputField h="35px" border="1px solid black" p=".5rem" />
            </NumberInput>
          </FormControl>
        </Flex>
        <Box>
          <Heading as="h6" size="sm" mt="1rem">
            {coinData.name} ${parseFloat(coinPrice) * parseFloat(coinQuantity)}
          </Heading>
          <Box mt="1rem">
            <Button
              onClick={(e) => buyTransaction(e)}
              type="submit"
              fontSize="sm"
              borderRadius="8px"
              color="#fff"
              background="rgb(105, 162, 53)"
              margin="0 0.5rem 0 0"
              padding="0.5rem 1.5rem"
              border="1px solid rgb(105, 162, 53)"
              _hover={{
                background: 'rgb(81, 126, 39)',
              }}
            >
              Buy
            </Button>
            <Button
              onClick={(e) => sellTransaction(e)}
              type="submit"
              fontSize="sm"
              borderRadius="8px"
              color="#fff"
              background="rgb(255, 0, 0)"
              margin="0 0.5rem 0 0"
              padding="0.5rem 1.5rem"
              border="1px solid rgb(255, 0, 0)"
              _hover={{
                background: 'rgb(200, 0, 0)',
              }}
            >
              Sell
            </Button>
            <Button
              onClick={() => dispatch(removeCoin())}
              fontSize="sm"
              border="1px solid rgb(105, 162, 53)"
              borderRadius="8px"
              background="none"
              padding={'0 16px'}
              _hover={{
                background: 'rgb(105, 162, 53)',
                color: '#fff',
                border: '1px solid rgb(105, 162, 53)',
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
