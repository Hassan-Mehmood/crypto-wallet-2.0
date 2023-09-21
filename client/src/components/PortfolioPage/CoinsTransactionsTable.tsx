import {
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { calculatePercentage, getProfitLossColor } from '../../utils/functions';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { useQuery } from 'react-query';
import { getCoinTransactions } from '../../api/axios';
import { BiArrowBack, BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { Button } from '@chakra-ui/button';
import { Transaction } from '../../types';
import { Image } from '@chakra-ui/image';
import { DeleteTransactionModal } from './DeleteTransactionModal';
import { EditTransactionModal } from './EditTransactionModal';
import { useState } from 'react';

interface props {
  setShowTable: React.Dispatch<React.SetStateAction<string>>;
  activeCoinId: number;
}

export default function CoinsTransactionsTable({ setShowTable, activeCoinId }: props) {
  const [transactionID, setTransactionID] = useState(0);

  const { data, isLoading, refetch } = useQuery('coinTransaction', () =>
    getCoinTransactions(activeCoinId)
  );

  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  const { colorMode } = useColorMode();

  return (
    <>
      <DeleteTransactionModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        transactionID={transactionID}
        refetch={refetch}
      />
      <EditTransactionModal isOpen={isEditOpen} onClose={onEditClose} />
      <Box>
        <Button
          display={'flex'}
          mb={'1rem'}
          alignItems={'center'}
          marginLeft={'2rem'}
          backgroundColor={'transparent'}
          px={0}
          gap={1}
          _hover={{
            backgroundColor: 'none',
            color: colorMode === 'light' ? '#8bc53f' : '#0facf0',
          }}
          _active={{
            backgroundColor: 'none',
          }}
        >
          <BiArrowBack />
          <Text fontSize={'1.2rem'} onClick={() => setShowTable('coinsTable')}>
            Back
          </Text>
        </Button>
        <Skeleton isLoaded={!isLoading}>
          <Flex justify="center" mb={{ md: '4rem' }}>
            <Flex
              flexDir={{ base: 'column', md: 'row' }}
              align={{ md: 'center' }}
              width={'100%'}
              p={{ md: '1.5rem' }}
              gap={{ base: 2, lg: 6 }}
            >
              <Flex
                flexDir={'column'}
                alignItems={'center'}
                // width={['20rem', '25rem']}
                px={{ base: '1.5rem', md: '0rem' }}
                py={{ base: '0.7rem', md: '0rem' }}
                gap={2}
              >
                <Box>
                  <Text color="#a3b1bf" fontSize={{ base: '0.9rem', lg: '1.05rem' }}>
                    {data?.coin.name} ({data?.coin.symbol}) Balance
                  </Text>
                </Box>
                <Flex
                  flexDir={{ base: 'column', md: 'row' }}
                  alignItems={{ base: 'center', md: 'end' }}
                  justify={'center'}
                  gap={1}
                >
                  <Flex alignItems={'center'} gap={2}>
                    <Image src={data?.coin.thump} width="1.7rem" height="1.7rem" />
                    <Heading fontSize={{ base: '1.85rem', lg: '1.91rem' }} fontWeight={'semibold'}>
                      ${data?.coin.holdingsInDollers.toLocaleString('en')}
                    </Heading>
                  </Flex>
                </Flex>
              </Flex>
              {/* <Box
                display={{ base: 'none', md: 'block' }}
                background={colorMode === 'light' ? '#000' : '#fff'}
                width="0.05rem"
                height="100%"
              /> */}
              <Flex
                flexDir={{ base: 'row', md: 'column' }}
                justifyContent={'center'}
                alignItems={'center'}
                flex={1}
                gap={[5, 10, 1]}
                px={{ base: '1.5rem', md: '0rem' }}
                py={{ base: '0.7rem', md: '0rem' }}
                borderRadius={'0.5rem'}
              >
                <Flex gap={[5, 10, 9]}>
                  <Box textAlign="center">
                    <Text color="#a3b1bf" fontSize={{ base: '0.9rem', lg: '1.05rem' }}>
                      Total Cost
                    </Text>
                    <Text fontWeight={'semibold'} fontSize={{ base: '1.1rem', lg: '1.3rem' }}>
                      $ {data?.coin.cost.toFixed(3)}
                    </Text>
                  </Box>
                  <Box textAlign="center">
                    <Text color="#a3b1bf" fontSize={{ base: '0.9rem', lg: '1.05rem' }}>
                      Quantity
                    </Text>
                    <Text fontWeight={'semibold'} fontSize={{ base: '1.1rem', lg: '1.3rem' }}>
                      {data?.coin.totalQuantity.toFixed(3)} {data?.coin.symbol}
                    </Text>
                  </Box>
                  <Box>
                    <Text color="#a3b1bf" fontSize={{ base: '0.9rem', lg: '1.05rem' }}>
                      Avg Buy price
                    </Text>
                    <Text fontWeight={'semibold'} fontSize={{ base: '1.1rem', lg: '1.3rem' }}>
                      $ {data?.coin.averageBuyPrice.toFixed(3)}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
              {/* <Box
                display={{ base: 'none', md: 'block' }}
                background={colorMode === 'light' ? '#000' : '#fff'}
                width="0.05rem"
                height="100%"
              /> */}
              <Flex
                px={{ base: '2rem', md: '0rem' }}
                py={{ base: '0.7rem', md: '0rem' }}
                // width={['20rem', '25rem']}
                flexDir={'column'}
                alignItems={'center'}
                gap={1}
                borderRadius={'0.5rem'}
              >
                <Text color="#a3b1bf" fontSize={{ base: '0.9rem', lg: '1.05rem' }}>
                  Total Profit / Loss
                </Text>
                <Text
                  fontWeight="semibold"
                  color={getProfitLossColor(data?.coin.profitLoss, colorMode)}
                  fontSize={{ base: '1.1rem', lg: '1.3rem' }}
                >
                  {calculatePercentage(data?.coin.profitLoss, data?.coin.cost)}% [$
                  {data?.coin.profitLoss.toLocaleString('en', { maximumFractionDigits: 2 })}]
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
                    onClick={() => {
                      setShowTable('transactionsTable');
                      // setActiveCoinId(coin.id);
                    }}
                  >
                    <Td textAlign={'center'}>
                      <Text>{transaction.type}</Text>
                    </Td>

                    <Td textAlign={'center'}>
                      <Text>$ {transaction.price}</Text>
                    </Td>

                    <Td textAlign={'center'}>
                      <Box>
                        <Text>
                          {transaction.type === 'BUY' ? '-' : '+'}${' '}
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
                          <BiEdit size={24} onClick={() => onEditOpen()} />
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
      </Box>
    </>
  );
}
