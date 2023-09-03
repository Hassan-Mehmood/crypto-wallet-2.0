import { useQuery } from 'react-query';
import { Table, Thead, Tbody, Tr, Th, TableContainer, Skeleton } from '@chakra-ui/react';
import CoinRow from './CoinRow';
import { HomeTableCoin } from '../../../types';
import { coinsList } from '../../../api/axios';

export default function CoinsTable() {
  const { data, isLoading } = useQuery('coinsList', () => coinsList());

  return (
    <Skeleton isLoaded={!isLoading}>
      <TableContainer mt="2rem">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Coin</Th>
              <Th>Price</Th>
              <Th>1h</Th>
              <Th>24h</Th>
              <Th>7d</Th>
              <Th>Total Volume</Th>
              <Th>Mkt Cap</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((coin: HomeTableCoin, coinCounter: number) => (
              <CoinRow key={coin.id} coin={coin} coinCounter={++coinCounter} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Skeleton>
  );
}
