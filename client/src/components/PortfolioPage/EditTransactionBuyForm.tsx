import { FormControl, FormLabel, Input, Button, useColorMode, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import useCustomToast from '../../hooks/useCustomToast';
import { UserTransactionsData } from '../../types';
import { getSingleTransaction } from '../../api/axios';
import { removeCoin } from '../../slices/coinSlice';

interface props {
  transactionID: number;
  isOpen: boolean;
  // pricePerCoin: string;
  // setPricePerCoin: React.Dispatch<React.SetStateAction<string>>;
  // coinQuantity: string;
  // setCoinQuantity: React.Dispatch<React.SetStateAction<string>>;
  // setTransactionDate: React.Dispatch<React.SetStateAction<string>>;
}

// pricePerCoin,
// setPricePerCoin,
// setCoinQuantity,
// setTransactionDate,

export default function EditTransactionBuyForm({ transactionID, isOpen }: props) {
  const [pricePerCoin, setPricePerCoin] = useState('0');
  const [coinQuantity, setCoinQuantity] = useState('0');
  const [transactionDate, setTransactionDate] = useState('');
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [originalTransactionWorth, setOriginalTransactionWorth] = useState(0);

  const { colorMode } = useColorMode();

  const coinData = useSelector((state: RootState) => state.searchCoinReducer);
  const userData = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();

  const showToast = useCustomToast();

  const queryClient = useQueryClient();
  const userPortfolioData = queryClient.getQueryData<UserTransactionsData>('userCoins');

  const editTransaction = useMutation(
    async () => {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/portfolio/edit-transaction`,
        {
          user: userData.id,
          coin_id: coinData.id,
          coinPrice: pricePerCoin,
          coinQuantity: coinQuantity,
          transactionId: transactionID,
          transactionDate: transactionDate,
          type: 'BUY',
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    {
      onMutate: () => setLoadingBtn(true),
      onSettled: () => setLoadingBtn(false),

      onSuccess: () => {
        showToast({
          title: 'Success',
          description: 'Transaction updated successfully',
          status: 'success',
        });

        // fetchCoinHoldings();
        queryClient.invalidateQueries('userCoins');
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

  const getTransactionData = useCallback(() => {
    if (!transactionID) {
      return;
    }

    getSingleTransaction(transactionID).then((res) => {
      setPricePerCoin(res.price.toString());
      setCoinQuantity(res.quantity.toString());
      setOriginalTransactionWorth(res.price * res.quantity);
    });
  }, [transactionID]);

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
      getTransactionData();
    }
  }, [coinData.apiId, getTransactionData, isOpen]);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const quantity = parseFloat(coinQuantity);
    const price = parseFloat(pricePerCoin);

    const transactionCost = quantity * price;

    if (!validateFormData(quantity, price)) {
      return;
    }

    if (!userPortfolioData?.dollerBalance) {
      return;
    }

    if (transactionCost > userPortfolioData?.dollerBalance + originalTransactionWorth) {
      showToast({
        title: 'Error',
        description: 'You do not have enough money to buy this coin',
        status: 'error',
      });
      return;
    }

    editTransaction.mutate();
  }

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <FormControl mt={'1rem'}>
        <FormLabel>Price per coin</FormLabel>
        <Input value={pricePerCoin} onChange={(e) => setPricePerCoin(e.target.value)} />
      </FormControl>
      <FormControl mt={'1.5rem'}>
        <FormLabel>Quantity</FormLabel>
        <Input value={coinQuantity} onChange={(e) => setCoinQuantity(e.target.value)} />
      </FormControl>
      <FormControl mt={'1.5rem'}>
        <Flex justify="space-between" alignItems="center">
          <FormLabel>Total Spent (USD)</FormLabel>
          <Text as="span" display="inline-block" mb="8px">
            Balance: $
            {userPortfolioData?.dollerBalance &&
              (userPortfolioData.dollerBalance + originalTransactionWorth).toFixed(2)}
          </Text>
        </Flex>
        <Input value={parseFloat(pricePerCoin) * parseFloat(coinQuantity) || '0'} readOnly />
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
  );
}
