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

  const addCoin = useMutation(
    async () => {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/portfolio/add`, {
        user: userData.id,
        bought_coin: coinData,
        coinQuantity,
        coinPrice,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        showToast('Success', 'Coin added successfully', 'success');
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

  function addTransaction(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!accountBalance) {
      showToast('Error', 'Something went wrong', 'error');
      return;
    }

    if (parseFloat(coinPrice) * parseFloat(coinQuantity) > accountBalance.dollerBalance) {
      showToast('Error', 'Insufficient funds', 'error');
      return;
    }

    addCoin.mutate();
  }

  return (
    <Box border="1px solid black" borderRadius={"0.7rem"} width={["25.5rem", "28rem", "36rem"]}>
      <Flex justifyContent="space-between" alignItems={"center"} backgroundColor={"#8bc53f"} px={["1rem", "1rem", "1.7rem"]} py={"1.5rem"} borderTopRadius={"0.7rem"} color={"#fff"}>
        <Heading as="h6" size="md" fontWeight={"semibold"}>
          Add Coin
        </Heading>
        <Heading as="h6" size="md" fontWeight={"semibold"}>
          <>Balance: ${accountBalance?.dollerBalance || 0}</>
        </Heading>
      </Flex>
      <Flex align="center" mb="2rem" px={["1rem", "1rem", "1.7rem"]} pt={"1rem"}>
        <Image src={coinData.thumb ? coinData.thumb : ''} />
        <Heading as="h6" size="sm" textTransform="capitalize" ml={`${coinData.name && ".5rem"}`} fontWeight={"semibold"}>
          {coinData.name || 'No coin selected'}
        </Heading>
      </Flex>
      <form >
        <Flex gap="1rem" px={["1rem", "1rem", "1.7rem"]} flexDir={"column"} width={"22rem"}>
          <FormControl display={"flex"} justifyContent={"space-between"}>
            <FormLabel>Quantity</FormLabel>
            <NumberInput
              step={0.01}
              precision={2}
              min={0}
              value={coinQuantity}
              width={"13rem"}
              onChange={(valueString) => handleQuantityInput(valueString)}
            >
              <NumberInputField h="35px" border="1px solid black" p=".5rem" />
            </NumberInput>
          </FormControl>
          <FormControl display={"flex"} justifyContent={"space-between"}>
            <FormLabel>Price</FormLabel>
            <NumberInput
              step={0.01}
              precision={2}
              width={"13rem"}
              value={coinPrice}
              onChange={(valueString) => handlePriceInput(valueString)}
            >
              <NumberInputField h="35px" border="1px solid black" p=".5rem" />
            </NumberInput>
          </FormControl>
        </Flex>
        <Box px={["1rem", "1rem", "1.7rem"]} pb={"1.5rem"}>
          <Heading as="h6" size="sm" mt="1rem" fontWeight={"semibold"}>
            {coinData.name} ${parseFloat(coinPrice) * parseFloat(coinQuantity)}
          </Heading>
          <Flex flexDir={["column", "column", "row"]} mt="1rem" alignItems={"center"}>
            <Button
              type="submit"
              fontSize="md"
              borderRadius="8px"
              color="#fff"
              background="#8bc53f"
              margin="0 0.5rem 0 0"
              border="1.5px solid #8bc53f"
              width={["18rem", "18rem", "10rem"]}
              _hover={{
                background: '#fff',
                color: "#8bc53f"
              }}
              onClick={(e) => addTransaction(e)}
            >
              Add Transaction
            </Button>
            <Button
              onClick={() => dispatch(removeCoin())}
              fontSize="sm"
              borderRadius="8px"
              background="none"
              padding={'0 16px'}
              _hover={{
                color: '#8bc53f',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </Box>
      </form>
    </Box>
  );
}
