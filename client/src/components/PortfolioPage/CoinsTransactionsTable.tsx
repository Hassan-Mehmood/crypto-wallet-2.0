import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { getCoinTransactions } from '../../api/axios';
import { Image } from '@chakra-ui/image';
import { calculatePercentage, getProfitLossColor } from '../../utils/functions';
import { Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
// import { Trash2 } from 'react-feather';
import { Transaction } from '../../types';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';

interface props {
  setShowTable: React.Dispatch<React.SetStateAction<string>>;
  activeCoinId: number;
}

export default function CoinsTransactionsTable({ setShowTable, activeCoinId }: props) {
  const { data, isLoading } = useQuery('coinTransaction', () => getCoinTransactions(activeCoinId));

  const delTransaction = useMutation(
    async (id: number) => {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/portfolio/transactions/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    },
    {
      // onMutate: () => setLoadingBtn(true),
      // onSettled: () => setLoadingBtn(false),

      onSuccess: () => {
        // showToast('Success', 'Coin bought successfully', 'success');
        // refetchBalance();
      },
      onError: () => {
        // showToast('Error', 'Something went wrong', 'error');
      },
    }
  );

  function deleteTransaction(id: number) {
    delTransaction.mutate(id);
  }

  return (
    <Box>
      <Button onClick={() => setShowTable('coinsTable')}>Back</Button>

      <Skeleton isLoaded={!isLoading}>
        <Flex mt="1rem" justify="space-between" align="center">
          <Box>
            <Box>
              <Text color="#58667e">
                {data?.coin.name} ({data?.coin.symbol}) Balance
              </Text>
            </Box>
            <Flex alignItems="center" mt="0.5rem">
              <Image src={data?.coin.thump} width="30px" height="auto" mr="1rem" />
              <Heading fontSize="32px">
                ${data?.coin.holdingsInDollers.toLocaleString('en')}
              </Heading>
              <Box
                backgroundColor={getProfitLossColor(data?.coin.profitLoss)}
                borderRadius="5px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                padding="5px 10px"
                color="white"
                ml="1rem"
                fontSize="12px"
                fontWeight="bold"
              >
                {calculatePercentage(data?.coin.profitLoss, data?.coin.cost)}%
              </Box>
            </Flex>
          </Box>
          <Flex>
            <Box mr="4rem">
              <Text color="#58667e">Total Cost</Text>
              <Text fontWeight="bold">${data?.coin.cost}</Text>
            </Box>
            <Box>
              <Text color="#58667e">Quantity</Text>
              <Text fontWeight="bold">
                {data?.coin.totalQuantity} {data?.coin.name}
              </Text>
            </Box>
            <Box mx="4rem">
              <Text color="#58667e">Avg Buy price</Text>
              <Text fontWeight="bold">${data?.coin.averageBuyPrice}</Text>
            </Box>
            <Box>
              <Text color="#58667e">Total Profit / Loss</Text>
              <Text fontWeight="bold" color={getProfitLossColor(data?.coin.profitLoss)}>
                {calculatePercentage(data?.coin.profitLoss, data?.coin.cost)}% ($
                {data?.coin.profitLoss.toLocaleString('en', { maximumFractionDigits: 2 })})
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        <TableContainer mt="3rem">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Type</Th>
                <Th>Price</Th>
                <Th>Amount</Th>
                <Th pr="0">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.transactions.length === 0 ? (
                <Tr>
                  <Td colSpan={4} textAlign="center">
                    No Transactions to Show
                  </Td>
                </Tr>
              ) : (
                data?.transactions.map((transaction: Transaction) => (
                  <Tr
                    key={transaction.id}
                    _hover={{ backgroundColor: '#f4f4f4' }}
                    onClick={() => {
                      setShowTable('transactionsTable');
                      // setActiveCoinId(coin.id);
                    }}
                  >
                    <Td>
                      <Box fontWeight={'bold'}>
                        <Text>{transaction.type}</Text>
                      </Box>
                    </Td>

                    <Td>
                      <Box fontWeight={'bold'}>
                        <Text>${transaction.price}</Text>
                      </Box>
                    </Td>

                    <Td>
                      <Box fontWeight="bold">
                        <Text>
                          {transaction.type === 'BUY' ? '-' : '+'}$
                          {parseFloat(transaction.quantity.toString()) *
                            parseFloat(transaction.price.toString())}
                        </Text>
                        <Text color={transaction.type === 'BUY' ? 'green' : 'red'}>
                          {transaction.type === 'BUY' ? '+' : '-'}
                          {transaction.quantity} {data?.coin.name}
                        </Text>
                      </Box>
                    </Td>
                    <Td>
                      <Flex>
                        <Box
                          color="#8bc53f"
                          borderRadius="50%"
                          padding="0.5rem"
                          _hover={{
                            backgroundColor: '#8bc53f',
                            cursor: 'pointer',
                            color: '#ffffff',
                          }}
                        >
                          <BiEdit size={24} />
                        </Box>
                        <Box
                          onClick={() => deleteTransaction(transaction.id)}
                          color="#8bc53f"
                          ml="1rem"
                          borderRadius="50%"
                          padding="0.5rem"
                          _hover={{
                            backgroundColor: '#8bc53f',
                            cursor: 'pointer',
                            color: '#ffffff',
                          }}
                        >
                          <AiOutlineDelete id="deleteBtn" size={24} />
                        </Box>
                      </Flex>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Skeleton>
    </Box>
  );
}
