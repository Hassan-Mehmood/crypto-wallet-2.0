import { useQuery } from 'react-query';
import { coinsList } from '../../api/axios';
import { Table, Thead, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react';
import { HomeTableCoin } from '../../types';
import CoinRow from './CoinRow';

export default function CoinsTable() {
  const { data } = useQuery('coinsList', () => coinsList());

  return (
    <TableContainer>
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
  );
}
