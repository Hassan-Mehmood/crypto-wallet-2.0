import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getUserTransactions } from '../api/axios';

export default function PortfolioPage() {
  const { data } = useQuery('transactions', getUserTransactions);

  console.log(data);

  // return (
  //   <Box as="section">
  //     {data?.coins.map((coin) => (
  //       <Box key={coin.id}>{coin.name}</Box>
  //     ))}
  //   </Box>
  // );
  return (
    <TableContainer mt="3rem">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th minW="10rem" pl="0">
              Name
            </Th>
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
              <Td>{coin.name}</Td>
              <Td>{coin.totalQuantity}</Td>
              <Td>{coin.averageBuyPrice}</Td>
              <Td>Profit</Td>
              <Td>Actions</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
