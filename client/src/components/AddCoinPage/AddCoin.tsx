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
  Center,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { removeCoin } from '../../slices/coinSlice';
import { useEffect, useState } from 'react';
import { getCoinMarketData, getUserBalance } from '../../api/axios';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';

export default function AddCoin() {
  const [coinQuantity, setCoinQuantity] = useState<string>('0.00');
  const [coinPrice, setCoinPrice] = useState<string>('0');
  const [loadingBtn, setLoadingBtn] = useState(false);

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
    <Box border="1px solid black" borderRadius={"0.5rem"} width={["25.5rem", "28rem", "36rem"]}
      background="rgba(255, 255, 255, 0.2)"
      backdropFilter="blur(10px)">
      <Flex justifyContent="space-between" alignItems={"center"} px={["1.5rem", "1.5rem", "1.7rem"]} py={"1.7rem"} borderTopRadius={"0.7rem"}>
        <Heading as="h6" size="md" fontWeight={"semibold"}>
          Buy / Sell Coin
        </Heading>
        <Heading as="h6" size="sm" fontWeight={'semibold'} color={"#8bc53f"}>
          Balance: ${accountBalance?.dollerBalance || 0}
        </Heading>
      </Flex>
      <Divider />
      <Flex justifyContent="space-between" alignItems={"center"} px={["1.5rem", "1.5rem", "1.7rem"]} position={"relative"} py={"1.3rem"}>
        <Flex>
          <Image src={coinData.thumb ? coinData.thumb : ''} />
          <Heading as="h6" size="sm" color={`${!coinData.name ? "#a3b1bf" : "#000"}`} textTransform="capitalize" ml={`${coinData.name && ".5rem"}`} fontWeight={"semibold"}>
            {coinData.name || 'No coin selected'}
          </Heading>
        </Flex>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          background="#000"
          width="0.05rem"
          height="100%"
        />
        <Heading as="h6" size="sm" fontWeight={"semibold"} color={`${(parseFloat(coinPrice) * parseFloat(coinQuantity)) === 0 ? "#a3b1bf" : "#000"}  `}>
          ${parseFloat(coinPrice) * parseFloat(coinQuantity)}
        </Heading>
      </Flex>
      <Divider color={"#a3b1bf"} />
      <form >
        <Flex gap="0.5rem" flexDir={"column"} py={"1rem"}>
          <FormControl display={'flex'} justifyContent={`center`} px={["1.5rem", "1.5rem", "4.1rem"]}>
            <Flex width={`${coinData.name ? "full" : "12rem"}`} justifyContent="space-between" alignItems={"center"}>
              <FormLabel fontWeight={"semibold"}>Quantity</FormLabel>
              <Flex width={`${coinData.name && ["17rem"]}`} justifyContent={"space-between"} alignItems={"center"} pb={"0.3rem"}>
                <NumberInput
                  color={"#a3b1bf"}
                  step={0.01}
                  precision={2}
                  min={0}
                  value={coinQuantity}
                  onChange={(valueString) => handleQuantityInput(valueString)}
                >
                  <NumberInputField width={`${!coinData.name && "3rem"}`} px={`${!coinData.name ? "0rem" : "0.5rem"}`} fontWeight={"semibold"} border={"none"} disabled={!coinData.name} />
                </NumberInput>
                <Text fontWeight={"semibold"}>{coinData.symbol}</Text>
              </Flex>
            </Flex>
          </FormControl>
          <FormControl display={'flex'} justifyContent={`center`} px={["1.5rem", "1.5rem", "4.1rem"]}>
            <Flex width={`${coinData.name ? "full" : "12rem"}`} justifyContent="space-between" alignItems={"center"}>
              <FormLabel fontWeight={"semibold"}>Price</FormLabel>
              <Flex width={`${coinData.name && "17rem"}`} justifyContent={"space-between"} alignItems={"center"} pb={"0.3rem"}>
                <NumberInput
                  color={"#a3b1bf"}
                  step={0.01}
                  precision={2}
                  value={coinPrice}
                  onChange={(valueString) => handlePriceInput(valueString)}
                >
                  <NumberInputField width={`${!coinData.name && "2rem"}`} px={`${!coinData.name ? "0rem" : "0.5rem"}`} fontWeight={"semibold"} border={"none"} disabled={!coinData.name} />
                </NumberInput>
                <Text fontWeight={"semibold"}>{coinData.symbol}</Text>
              </Flex>
            </Flex>
          </FormControl>
        </Flex>
        {coinData.name && <Divider backgroundColor={"black"} height={"0.8px"} />}
        <Box px={['1.5rem', '1.5rem', '1.7rem']} py={'1rem'}>
          <Flex flexDir={'column'} mt={`${coinData.name && "1rem"}`} alignItems={'center'}>
            <Flex flexDir={['column', 'column', 'row']} gap={2}>
              <Button
                onClick={(e) => buyTransaction(e)}
                // disabled={disableBtn}
                type="submit"
                fontSize="md"
                borderRadius="0.3rem"
                color="#8bc53f"
                background="#fff"
                margin="0 0.5rem 0 0"
                padding="0.5rem 1.5rem"
                border="1px solid #8bc53f"
                width={['16rem', '18rem', '10rem']}
                _hover={{
                  background: "none"
                }}
              >
                BUY
              </Button>
              <Button
                onClick={(e) => sellTransaction(e)}
                // disabled={disableBtn}
                type="submit"
                fontSize="sm"
                borderRadius="0.3rem"
                color="rgb(255, 0, 0)"
                background="#fff"
                margin="0 0.5rem 0 0"
                padding="0.5rem 1.5rem"
                width={['16rem', '18rem', '10rem']}
                border="1px solid rgb(255, 0, 0)"
                _hover={{
                  background: "none"
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
