import { Box, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getUserTransactions } from '../api/axios';
import { useEffect, useState } from 'react';
// import data from '../coinsData.json';

export default function PortfolioPage() {
  const { data } = useQuery('transactions', getUserTransactions);

  function getProfitLossColor(profitLoss: number) {
    if (profitLoss > 0) {
      return 'green'; // Apply a CSS class for green color
    } else if (profitLoss < 0) {
      return 'red'; // Apply a CSS class for red color
    } else {
      return ''; // No specific color class needed
    }
  }

  // function calculatePercentage(total: number, value: number) {
  //   return (value / total) * 100;
  // }

  return (
    <TableContainer mt="3rem">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Holding</Th>
            <Th>Avg Buy Price</Th>
            <Th>Profit/Loss</Th>
            <Th pr="0">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.coins.map((coin) => (
            <Tr key={coin.id}>
              <Td>{coin.name}</Td>
              <Td>${coin.latestPrice}</Td>
              <Td>
                <Flex flexDirection="column">
                  <Box fontWeight="bold">
                    {coin.totalQuantity}{' '}
                    <Box as="span" fontSize="12px">
                      {coin.symbol}
                    </Box>
                  </Box>
                  <Box fontSize="14px">(${coin.holdingsInDollers.toFixed(2)})</Box>
                </Flex>
              </Td>
              <Td>${coin.averageBuyPrice.toFixed(2)}</Td>
              <Td color={getProfitLossColor(coin.profitLoss)}>
                <Flex flexDirection="column">
                  <Box>
                    {coin.profitLoss > 0 ? '+' : ''}${coin.profitLoss.toFixed(2)}
                  </Box>
                  {/* <Box fontSize="14px">{coin.profitLossPercentage}%</Box> */}
                </Flex>
              </Td>
              <Td>Actions</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
