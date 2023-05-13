import {
  Table,
  Box,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Image,
} from '@chakra-ui/react';
import { calculatePercentage, getProfitLossColor } from '../../utils/functions';
import { Trash2 } from 'react-feather';
import { QueryClient, useMutation } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

interface props {
  coins:
    | {
        id: number;
        name: string;
        apiSymbol: string;
        symbol: string;
        thump: string;
        large: string;
        marketCapRank: number;
        averageBuyPrice: number;
        latestPrice: number;
        totalQuantity: number;
        holdingsInDollers: number;
        profitLoss: number;
        totalInvestment: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        transactions: {
          id: number;
          price: number;
          quantity: number;
          timeBought: Date;
          createdAt: Date;
          updatedAt: Date;
        }[];
      }[]
    | undefined;
}

export default function PortfolioTable({ coins }: props) {
  const [updateDeletedCoin, setUpdateDeletedCoin] = useState(false);
  const queryClient = new QueryClient();

  const deleteCoinMutation = useMutation(
    (coinId: number) =>
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/transaction/delete/${coinId}`, {
        withCredentials: true,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('transactions');
        setUpdateDeletedCoin(!updateDeletedCoin);
        console.log('Deleted');
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  function deleteCoin(id: number) {
    deleteCoinMutation.mutate(id);
  }

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
          {coins?.map((coin: any) => (
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
              <Td>
                <Box as="span" display="inline-block" cursor="pointer">
                  <Trash2 color="maroon" onClick={() => deleteCoin(coin.id)} />
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
