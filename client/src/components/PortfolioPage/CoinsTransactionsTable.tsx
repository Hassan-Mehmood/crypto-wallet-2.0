import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import { useQuery } from 'react-query';
import { getCoinTransactions } from '../../api/axios';
import { Image } from '@chakra-ui/image';
import { calculatePercentage, getProfitLossColor } from '../../utils/functions';
import { Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
// import { Trash2 } from 'react-feather';
import { Transaction } from '../../types';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';

interface props {
  setShowTable: React.Dispatch<React.SetStateAction<string>>;
  activeCoinId: number;
}

export default function CoinsTransactionsTable({ setShowTable, activeCoinId }: props) {
  const { data, isLoading } = useQuery('coinTransaction', () => getCoinTransactions(activeCoinId));

  return (
    <Box>
      <Button onClick={() => setShowTable('coinsTable')}>Back</Button>
      <Skeleton isLoaded={!isLoading}>
        <Flex flexDir={"column"} justify="space-between" align="center" gap={2}>
          <Flex
            flexDir={"column"}
            alignItems={"center"}
            border={"1px solid #000"}
            width={["20rem"]}
            px={"1.5rem"} py={"0.7rem"}
            borderRadius={"0.5rem"}
            gap={2}>
            <Box>
              <Text color="#a3b1bf" fontSize={"0.9rem"}>
                {data?.coin.name} ({data?.coin.symbol}) Balance
              </Text>
            </Box>
            <Flex flexDir={"column"} alignItems="center" gap={1}>
              <Flex alignItems={"center"} gap={2}>
                <Image src={data?.coin.thump} width="1.7rem" height="1.7rem" />
                <Heading fontSize="1.85rem" fontWeight={"semibold"}>
                  $ {data?.coin.holdingsInDollers.toLocaleString('en')}
                </Heading>
              </Flex>
              <Box
                color={`${getProfitLossColor(data?.coin.profitLoss)}`}
                fontSize="0.9rem"
                fontWeight="semibold"
              >
                {calculatePercentage(data?.coin.profitLoss, data?.coin.cost)}%
              </Box>
            </Flex>
          </Flex>
          <Flex flexDir={"column"} alignItems={"center"} gap={2} >
            <Flex
              border={"1px solid #000"}
              justifyContent={"center"}
              width={["20rem"]}
              gap={5} px={"1.5rem"} py={"0.7rem"}
              borderRadius={"0.5rem"}>
              <Flex flexDir={"column"} alignItems={"center"} gap={1}>
                <Text color="#a3b1bf" fontSize={"0.9rem"}>Total Cost</Text>
                <Text fontWeight={"semibold"} fontSize={"1.1rem"}>
                  $ {data?.coin.cost}
                </Text>
              </Flex>
              <Flex flexDir={"column"} alignItems={"center"} gap={1}>
                <Text color="#a3b1bf" fontSize={"0.9rem"}>Quantity</Text>
                <Text fontWeight={"semibold"} fontSize={"1.1rem"}>
                  {data?.coin.totalQuantity} {data?.coin.symbol}
                </Text>
              </Flex>
              <Flex flexDir={"column"} alignItems={"center"} gap={1}>
                <Text color="#a3b1bf" fontSize={"0.9rem"}>Avg Buy price</Text>
                <Text fontWeight={"semibold"} fontSize={"1.1rem"}>
                  $ {data?.coin.averageBuyPrice}
                </Text>
              </Flex>
            </Flex>
            <Flex
              border={"1px solid #000"}
              px={"2rem"} py={"0.7rem"}
              width={["20rem"]}
              flexDir={"column"}
              alignItems={"center"}
              gap={1}
              borderRadius={"0.5rem"}>
              <Text color="#a3b1bf" fontSize={"0.9rem"}>Total Profit / Loss</Text>
              <Text fontWeight="semibold" color={getProfitLossColor(data?.coin.profitLoss)} >
                {calculatePercentage(data?.coin.profitLoss, data?.coin.cost)}% ($
                {data?.coin.profitLoss.toLocaleString('en', { maximumFractionDigits: 2 })})
              </Text>
            </Flex>
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
              {data?.transactions.map((transaction: Transaction) => (
                <Tr
                  key={transaction.id}
                  _hover={{ backgroundColor: '#f4f4f4', cursor: 'pointer' }}
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
                      <Box color="#8bc53f">
                        <BiEdit size={24} />
                      </Box>
                      <Box color="#8bc53f" ml="1rem">
                        <AiOutlineDelete size={24} />
                      </Box>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Skeleton>
    </Box>
  );
}
