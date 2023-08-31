import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import { useQuery } from 'react-query';
import { getCoinTransactions } from '../../api/axios';
import { Image } from '@chakra-ui/image';
import { calculatePercentage, getProfitLossColor } from '../../utils/functions';

interface props {
  setShowTable: React.Dispatch<React.SetStateAction<string>>;
  activeCoinId: number;
}

export default function CoinsTransactionsTable({ setShowTable, activeCoinId }: props) {
  const { data } = useQuery('coinTransaction', () => getCoinTransactions(activeCoinId));

  console.log(data);

  return (
    <Box>
      <Button onClick={() => setShowTable('coinsTable')}>Back</Button>

      <Flex mt="1rem" justify="space-between" align="center">
        <Box>
          <Box>
            <Text color="#58667e">
              {data?.coin.name} ({data?.coin.symbol}) Balance
            </Text>
          </Box>
          <Flex alignItems="center" mt="0.5rem">
            <Image src={data?.coin.thump} width="30px" height="auto" mr="1rem" />
            <Heading fontSize="32px">${data?.coin.holdingsInDollers.toLocaleString('en')}</Heading>
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
              {calculatePercentage(data?.coin.holdingsInDollers, data?.coin.totalInvestment)}%
            </Box>
          </Flex>
        </Box>
        <Flex>
          <Box>
            <Text color="#58667e">Quantity</Text>
            <Text fontWeight="bold">
              {data?.coin.totalQuantity} {data?.coin.name}
            </Text>
          </Box>
          <Box mx="4rem">
            <Text color="#58667e">Avg Buy price</Text>
            <Text fontWeight="bold">{data?.coin.averageBuyPrice}</Text>
          </Box>
          <Box>
            <Text color="#58667e">Total Profit / Loss</Text>
            <Text fontWeight="bold" color={getProfitLossColor(data?.coin.profitLoss)}>
              {calculatePercentage(data?.coin.holdingsInDollers, data?.coin.totalInvestment)}% ($
              {data?.coin.profitLoss.toLocaleString('en', { maximumFractionDigits: 2 })})
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
