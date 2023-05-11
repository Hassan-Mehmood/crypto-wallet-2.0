import {
  Box,
  Image,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Button,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getUserTransactions } from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function PortfolioPage() {
  const { data } = useQuery('transactions', getUserTransactions);
  const navigate = useNavigate();

  function getProfitLossColor(profitLoss: number | undefined) {
    if (profitLoss === undefined) {
      return '';
    }

    if (profitLoss > 0) {
      return 'green';
    } else if (profitLoss < 0) {
      return 'red';
    } else {
      return '';
    }
  }

  function calculatePercentage(newPrice: number, oldPrice: number) {
    const percentage = ((newPrice - oldPrice) / oldPrice) * 100;
    const sign = `${percentage > 0 ? '+' : ''}`;
    return `${sign}${percentage.toFixed(2)}`;
  }

  return (
    <>
      <Flex align="center" justify="space-between">
        <Box>
          <Text fontSize={25} fontWeight="bold" mt=".5rem">
            $100
          </Text>
        </Box>

        <Box zIndex="0">
          <Button
            // onClick={handlePortfolioSize}
            fontSize="sm"
            borderRadius="4px"
            color="#fff"
            background="rgb(105, 162, 53)"
            padding={'0 16px'}
            _hover={{
              background: 'rgb(81, 126, 39)',
            }}
          >
            Manage Portfolio Size
          </Button>
          <Button
            onClick={() => navigate('/addcoin')}
            fontSize="sm"
            borderRadius="4px"
            color="#fff"
            background="rgb(105, 162, 53)"
            padding={'0 16px'}
            ml="1rem"
            _hover={{
              background: 'rgb(81, 126, 39)',
            }}
          >
            Add Coins
          </Button>
        </Box>
      </Flex>
      <Flex align="center" mt="1rem">
        <Box>
          <Text mt="1rem" fontSize={14} fontWeight="bold">
            All time profit
          </Text>
          <Text fontSize={14} color={getProfitLossColor(data?.allTimeProfit)}>
            ${data?.allTimeProfit.toFixed(2)}
          </Text>
        </Box>
        <Flex ml="3rem" alignItems="center">
          <Box mr=".75rem">
            <Image src={data?.bestPerformer.thump} />
          </Box>
          <Box>
            <Text mt="1rem" fontSize={14} fontWeight="bold">
              Best Performer
            </Text>
            <Text fontSize={14} color={getProfitLossColor(data?.bestPerformer.value)}>
              ${data?.bestPerformer.value.toFixed(2)}
            </Text>
          </Box>
        </Flex>
        <Flex ml="3rem" alignItems="center">
          <Box mr="0.75rem">
            <Image src={data?.worstPerformer.thump} />
          </Box>
          <Box>
            <Text mt="1rem" fontSize={14} fontWeight="bold">
              Worst Performer
            </Text>
            <Text fontSize={14} color={getProfitLossColor(data?.worstPerformer.value)}>
              ${data?.worstPerformer.value.toFixed(2)}
            </Text>
          </Box>
        </Flex>
      </Flex>
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
                <Td>
                  <Flex alignItems="center">
                    <Image src={coin.thump} width="25px" height="auto" mr="5px" />
                    {coin.name}
                  </Flex>
                </Td>
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
                    <Box fontSize="14px">
                      {calculatePercentage(coin.holdingsInDollers, coin.totalInvestment)}%
                    </Box>
                  </Flex>
                </Td>
                <Td>Actions</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
