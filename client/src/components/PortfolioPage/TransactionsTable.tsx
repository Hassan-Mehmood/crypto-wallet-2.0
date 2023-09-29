import {
  Box,
  Flex,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { Transaction, coinTransaction } from '../../types';
import { useState } from 'react';
import { DeleteTransactionModal } from './DeleteTransactionModal';
import { EditTransactionModal } from './EditTransactionModal';
import { useDispatch } from 'react-redux';
import { addCoin } from '../../slices/coinSlice';

interface props {
  isLoading: boolean;
  data: coinTransaction | undefined;
  setShowTable: React.Dispatch<React.SetStateAction<string>>;
  refetch: any;
}

export default function TransactionsTable({ isLoading, data, setShowTable, refetch }: props) {
  const [transactionID, setTransactionID] = useState(0);

  const { colorMode } = useColorMode();
  const dispatch = useDispatch();

  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  return (
    <>
      <DeleteTransactionModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        transactionID={transactionID}
        refetch={refetch}
      />

      <EditTransactionModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        transactionID={transactionID}
      />

      <Skeleton isLoaded={!isLoading}>
        <TableContainer mt="3rem">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th textAlign={'center'}>Type</Th>
                <Th textAlign={'center'}>Price</Th>
                <Th textAlign={'center'}>Amount</Th>
                <Th textAlign={'center'}>Date</Th>
                <Th textAlign={'center'}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.transactions.map((transaction: Transaction) => (
                <Tr
                  key={transaction.id}
                  _hover={{
                    backgroundColor: colorMode === 'light' ? '#f4f4f4' : '#212835',
                    cursor: 'pointer',
                  }}
                  onClick={() => setShowTable('transactionsTable')}
                >
                  <Td textAlign={'center'}>
                    <Text>{transaction.type}</Text>
                  </Td>

                  <Td textAlign={'center'}>
                    <Text>${transaction.price}</Text>
                  </Td>

                  <Td textAlign={'center'}>
                    <Box>
                      <Text>
                        {transaction.type === 'BUY' ? '-' : '+'}$
                        {parseFloat(transaction.quantity.toString()) *
                          parseFloat(transaction.price.toString())}
                      </Text>
                      <Text
                        color={
                          transaction.type === 'BUY'
                            ? colorMode === 'light'
                              ? '#8bc53f'
                              : '#0facf0'
                            : 'rgb(255, 0, 0)'
                        }
                        fontWeight="semibold"
                      >
                        {transaction.type === 'BUY' ? '+' : '-'}
                        {transaction.quantity} {data?.coin.name}
                      </Text>
                    </Box>
                  </Td>

                  <Td textAlign={'center'}>{transaction.date.toString().split('T')[0]}</Td>

                  <Td textAlign={'center'}>
                    <Flex justifyContent={'center'} gap={2}>
                      <Box color={colorMode === 'light' ? '#8bc53f' : '#0facf0'}>
                        <BiEdit
                          size={24}
                          onClick={() => {
                            setTransactionID(transaction.id);
                            dispatch(
                              addCoin({
                                id: data.coin.apiId,
                                name: data.coin.name,
                                symbol: data.coin.symbol,
                                api_symbol: data.coin.apiSymbol,
                                market_cap_rank: data.coin.marketCapRank,
                                thumb: data.coin.thump,
                                large: data.coin.large,
                              })
                            );
                            onEditOpen();
                          }}
                        />
                      </Box>
                      <Box color="rgb(255, 0, 0)">
                        <AiOutlineDelete
                          size={24}
                          onClick={() => {
                            setTransactionID(transaction.id);
                            onDeleteOpen();
                          }}
                        />
                      </Box>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Skeleton>
    </>
  );
}
