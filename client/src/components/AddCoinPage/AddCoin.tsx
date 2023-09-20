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
  Divider,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { removeCoin } from '../../slices/coinSlice';
import { useEffect, useState } from 'react';
import { getCoinHoldingQuantity, getCoinMarketData, getUserBalance } from '../../api/axios';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';

export default function AddCoin() {
  const [coinQuantity, setCoinQuantity] = useState<string>('0.00');
  const [coinPrice, setCoinPrice] = useState<string>('0');
  const [loadingBtn, setLoadingBtn] = useState(false);

  const { colorMode } = useColorMode();

  const coinData = useSelector((state: RootState) => state.searchCoinReducer);
  const userData = useSelector((state: RootState) => state.userReducer);

  const dispatch = useDispatch();
  const toast = useToast();

  const { data: accountBalance, refetch: refetchBalance } = useQuery(
    'accountBalance',
    getUserBalance
  );

  const { data: coinHoldingQuantity, refetch: refetchCoinQuantity } = useQuery(
    'coinHoldingQuantity',
    () => {
      if (!coinData.symbol) {
        return;
      }
      return getCoinHoldingQuantity(coinData.symbol);
    }
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
      onMutate: () => setLoadingBtn(true),
      onSettled: () => setLoadingBtn(false),

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
      onMutate: () => setLoadingBtn(true),
      onSettled: () => setLoadingBtn(false),

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

    refetchCoinQuantity();

    return () => {
      isMounted = false;
      dispatch(removeCoin());
    };
  }, [coinData.id, dispatch, refetchCoinQuantity]);

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

    if (coinHoldingQuantity && parseFloat(coinQuantity) > coinHoldingQuantity.holdingsInPortfolio) {
      showToast('Error', 'Insufficient coins', 'error');
      return;
    }

    sellCoin.mutate();
  }

  return (
    <Box
      width={['25.5rem', '28rem', '36rem']}
      borderRadius={'0.5rem'}
      border={colorMode === 'light' ? '1px solid black' : 'none'}
      backgroundColor={colorMode === 'light' ? 'none' : '#2d3748'}
    >
      <Flex
        justifyContent="space-between"
        alignItems={'center'}
        fontWeight={'semibold'}
        px={['1.5rem', '1.5rem', '1.7rem']}
        py={'1.7rem'}
      >
        <Heading size="md">Buy / Sell Coin</Heading>
        <Heading size="sm" color={colorMode === 'light' ? '#8bc53f' : '#0facf0'}>
          Balance: ${accountBalance?.dollerBalance || 0}
        </Heading>
      </Flex>
      <Divider borderColor={colorMode === 'light' ? '#000' : '#fff'} />

      {/* Coin name and coin worth in doller starts */}
      <Flex
        justifyContent="space-between"
        alignItems={'center'}
        px={['1.5rem', '1.5rem', '1.7rem']}
        position={'relative'}
        py={'1.3rem'}
      >
        <Flex>
          <Image src={coinData.thumb ? coinData.thumb : ''} />
          <Heading
            size="sm"
            color={!coinData.name ? '#a3b1bf' : colorMode === 'light' ? '#000' : '#fff'}
            textTransform="capitalize"
            ml={`${coinData.name && '.5rem'}`}
          >
            {coinData.name || 'No coin selected'}
          </Heading>
        </Flex>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          backgroundColor={colorMode === 'light' ? '#000' : '#fff'}
          transform="translate(-50%, -50%)"
          width="0.03rem"
          height="100%"
        />
        <Heading
          as="h6"
          size="sm"
          fontWeight={'semibold'}
          color={`${
            parseFloat(coinPrice) * parseFloat(coinQuantity) === 0
              ? '#a3b1bf'
              : colorMode === 'light'
              ? '#000'
              : '#fff'
          }  `}
        >
          ${parseFloat(coinPrice) * parseFloat(coinQuantity)}
        </Heading>
      </Flex>
      {/* Coin name and coin worth in doller ends */}

      {/* Coin Quantity in portfolio ends */}
      {coinData.name !== null && (
        <Box px={['1.5rem', '1.5rem', '1.7rem']} position={'relative'}>
          <Heading
            size="sm"
            color={colorMode === 'light' ? '#000' : '#fff'}
            textTransform="capitalize"
            m={'0 0 1.3rem 0.5rem'}
          >
            {coinHoldingQuantity?.holdingsInPortfolio || 0} {coinData.name} in portfolio
          </Heading>
        </Box>
      )}
      {/* Coin Quantity in portfolio ends */}

      <Divider borderColor={colorMode === 'light' ? '#000' : '#fff'} />
      <form>
        <Flex gap="0.5rem" flexDir={'column'} py={'1rem'}>
          <FormControl
            display={'flex'}
            justifyContent={`center`}
            px={['1.5rem', '1.5rem', '4.1rem']}
          >
            <Flex
              width={`${coinData.name ? 'full' : '12rem'}`}
              justifyContent="space-between"
              alignItems={'center'}
            >
              <FormLabel fontWeight={'semibold'}>Quantity</FormLabel>
              <Flex
                width={`${coinData.name && ['17rem']}`}
                justifyContent={'space-between'}
                alignItems={'center'}
                pb={'0.3rem'}
              >
                <NumberInput
                  color={'#a3b1bf'}
                  step={0.01}
                  precision={4}
                  min={0}
                  value={coinQuantity}
                  onChange={(valueString) => handleQuantityInput(valueString)}
                >
                  <NumberInputField
                    width={`${!coinData.name && '3rem'}`}
                    px={`${!coinData.name ? '0rem' : '0.5rem'}`}
                    fontWeight={'semibold'}
                    border={'none'}
                    disabled={!coinData.name}
                  />
                </NumberInput>
                <Text fontWeight={'semibold'}>{coinData.symbol}</Text>
              </Flex>
            </Flex>
          </FormControl>
          <FormControl
            display={'flex'}
            justifyContent={`center`}
            px={['1.5rem', '1.5rem', '4.1rem']}
          >
            <Flex
              width={`${coinData.name ? 'full' : '12rem'}`}
              justifyContent="space-between"
              alignItems={'center'}
            >
              <FormLabel fontWeight={'semibold'}>Price</FormLabel>
              <Flex
                width={`${coinData.name && '17rem'}`}
                justifyContent={'space-between'}
                alignItems={'center'}
                pb={'0.3rem'}
              >
                <NumberInput
                  color={'#a3b1bf'}
                  step={0.01}
                  precision={4}
                  value={coinPrice}
                  onChange={(valueString) => handlePriceInput(valueString)}
                >
                  <NumberInputField
                    width={`${!coinData.name && '2rem'}`}
                    px={`${!coinData.name ? '0rem' : '0.5rem'}`}
                    fontWeight={'semibold'}
                    border={'none'}
                    disabled={!coinData.name}
                  />
                </NumberInput>
                <Text fontWeight={'semibold'}>{coinData.symbol}</Text>
              </Flex>
            </Flex>
          </FormControl>
        </Flex>
        {coinData.name && (
          <Divider borderColor={colorMode === 'light' ? '#000' : '#fff'} height={'0.8px'} />
        )}
        <Box px={['1.5rem', '1.5rem', '1.7rem']} py={'1rem'}>
          <Flex flexDir={'column'} mt={`${coinData.name && '1rem'}`} alignItems={'center'}>
            <Flex flexDir={['column', 'column', 'row']} gap={2}>
              <Button
                onClick={(e) => buyTransaction(e)}
                isLoading={loadingBtn}
                type="submit"
                fontSize="md"
                borderRadius="0.3rem"
                color={colorMode === 'light' ? '#8bc53f' : '#0facf0'}
                backgroundColor={colorMode === 'light' ? '#fff' : '#2d3748'}
                border={`1px solid ${colorMode === 'light' ? '#8bc53f' : '#0facf0'}`}
                margin="0 0.5rem 0 0"
                padding="0.5rem 1.5rem"
                width={['16rem', '18rem', '10rem']}
                _hover={{
                  background: 'none',
                }}
              >
                BUY
              </Button>
              <Button
                onClick={(e) => sellTransaction(e)}
                isLoading={loadingBtn}
                type="submit"
                fontSize="sm"
                borderRadius="0.3rem"
                backgroundColor={colorMode === 'light' ? '#fff' : '#2d3748'}
                color="rgb(255, 0, 0)"
                background="#fff"
                margin="0 0.5rem 0 0"
                padding="0.5rem 1.5rem"
                width={['16rem', '18rem', '10rem']}
                border="1px solid rgb(255, 0, 0)"
                _hover={{
                  background: 'none',
                }}
              >
                SELL
              </Button>
            </Flex>
            <Button
              onClick={() => {
                dispatch(removeCoin());
                setCoinQuantity('0.00');
                setCoinPrice('0');
              }}
              mt={'0.7rem'}
              fontSize="sm"
              borderRadius="8px"
              background="none"
              padding={'0 16px'}
              _hover={{
                background: 'none',
              }}
            >
              cancel
            </Button>
          </Flex>
        </Box>
      </form>
    </Box>
  );
}
