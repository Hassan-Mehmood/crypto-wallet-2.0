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
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { removeCoin } from '../../slices/coinSlice';
import { useEffect, useState } from 'react';
import { getCoinMarketData } from '../../api/axios';
import { useMutation } from 'react-query';
import axios from 'axios';

export default function SearchCoin() {
  const [coinQuantity, setCoinQuantity] = useState<number>(0);
  const [coinPrice, setCoinPrice] = useState<number>(0);

  const coinData = useSelector((state: RootState) => state.searchCoinReducer);
  const dispatch = useDispatch();

  const addCoin = useMutation(
    async () => {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/transaction/add`, {
        bought_coin: coinData,
        coinQuantity,
        coinPrice,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleQuantityInput = (value: number) => {
    if (isNaN(value)) {
      setCoinQuantity(0);
      return;
    }
    setCoinQuantity(value);
  };

  const handlePriceInput = (value: number) => {
    if (isNaN(value)) {
      setCoinPrice(0);
      return;
    }
    setCoinPrice(value);
  };

  useEffect(() => {
    if (!coinData.id) {
      setCoinPrice(0);
      return;
    }

    getCoinMarketData(coinData.id).then((res) => {
      const marketData = res.market_data;

      if (!marketData) return;

      setCoinPrice(marketData.current_price?.usd || 0);
    });
  }, [coinData]);

  function addTransaction(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    addCoin.mutate();
  }

  return (
    <Box border="1px solid black" p="1rem" maxW="600px" w="100%">
      <Flex justifyContent="space-between">
        <Heading as="h6" size="md" mb="2rem">
          Add Coin
        </Heading>
        <Heading as="h6" size="md" mb="2rem">
          Balance:
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
              min={0}
              value={coinQuantity}
              onChange={(valueString, valueNumber) => handleQuantityInput(valueNumber)}
            >
              <NumberInputField h="35px" border="1px solid black" p=".5rem" />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <NumberInput
              value={coinPrice}
              onChange={(valueString, valueNumber) => handlePriceInput(valueNumber)}
            >
              <NumberInputField h="35px" border="1px solid black" p=".5rem" />
            </NumberInput>
          </FormControl>
        </Flex>
        <Box>
          <Heading as="h6" size="sm" mt="1rem">
            {coinData.name} ${coinPrice * coinQuantity}
          </Heading>
          <Box mt="1rem">
            <Button
              onClick={(e) => addTransaction(e)}
              type="submit"
              fontSize="sm"
              borderRadius="8px"
              color="#fff"
              background="rgb(105, 162, 53)"
              margin="0 0.5rem 0 0"
              border="1px solid rgb(105, 162, 53)"
              _hover={{
                background: 'rgb(81, 126, 39)',
              }}
            >
              Add Transaction
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
