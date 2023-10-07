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
  Text,
  useColorMode,
} from '@chakra-ui/react';

import { useCallback, useEffect, useState } from 'react';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import useCustomToast from '../../hooks/useCustomToast';
import { useMutation, useQueryClient } from 'react-query';
import { UserTransactionsData } from '../../types';
import axios from 'axios';
import { removeCoin } from '../../slices/coinSlice';
import { getCoinHoldingQuantity, getSingleTransaction } from '../../api/axios';

interface IEditTransactionModal {
  isOpen: boolean;
  onClose: () => void;
  transactionID: number;
  transactionType: string;
}
export const EditTransactionModal = ({
  isOpen,
  onClose,
  transactionID,
  transactionType,
}: IEditTransactionModal) => {
  const { colorMode } = useColorMode();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [pricePerCoin, setPricePerCoin] = useState('0');
  const [coinQuantity, setCoinQuantity] = useState('0');
  const [coinHoldingQuantity, setCoinHoldingQuantity] = useState(0);
  const [transactionDate, setTransactionDate] = useState('');

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
          type: transactionType,
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

    // if (transactionType === 'SELL') {
    //   if (quantity + coinHoldingQuantity > coinHoldingQuantity) {
    //     showToast({
    //       title: 'Error',
    //       description: 'You do not have enough coins to sell',
    //       status: 'error',
    //     });
    //     return false;
    //   }
    // }

    return true;
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
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

    editTransaction.mutate();
  }

  const fetchCoinHoldings = useCallback(() => {
    if (!coinData.apiId) {
      return;
    }
    getCoinHoldingQuantity(coinData.apiId).then((res) => {
      const quantity = res.holdingsInPortfolio;

      setCoinHoldingQuantity(quantity);
    });
  }, [coinData.apiId]);

  const getTransactionData = useCallback(() => {
    if (!transactionID) {
      return;
    }

    getSingleTransaction(transactionID).then((res) => {
      setPricePerCoin(res.price.toString());
      setCoinQuantity(res.quantity.toString());
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
      fetchCoinHoldings();
      getTransactionData();
      console.log('HERE');
      // return () => (isMounted = false);
    }
  }, [coinData.apiId, getTransactionData, fetchCoinHoldings, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent width={'25.6rem'} position={'relative'}>
        <ModalHeader textAlign={'center'}>Edit Transaction</ModalHeader>
        <ModalCloseButton position={'absolute'} right={'0.8rem'} top={'1.1rem'} />
        <ModalBody py="1.5rem">
          {transactionType === 'BUY' ? (
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
          ) : (
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
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
