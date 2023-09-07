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
import { BiArrowBack, BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';

interface props {
  setShowTable: React.Dispatch<React.SetStateAction<string>>;
  activeCoinId: number;
}

export default function CoinsTransactionsTable({ setShowTable, activeCoinId }: props) {
  const { data, isLoading } = useQuery('coinTransaction', () => getCoinTransactions(activeCoinId));

  return (
    <Box>
      <Button
        display={"flex"}
        mb={"1rem"}
        alignItems={"center"}
        marginLeft={"2rem"}
        backgroundColor={"transparent"}
        px={0}
        gap={1}
        _hover={{
          backgroundColor: "none",
          color: "#8bc53f"
        }}
        _active={{
          backgroundColor: "none",
        }}
      >
        <BiArrowBack />
        <Text
          fontSize={"1.2rem"}
          onClick={() => setShowTable('coinsTable')}>
          Back
        </Text>
      </Button>
      <Skeleton isLoaded={!isLoading}>
        <Flex justify="center" mb={{ md: "4rem" }}>
          <Flex
            flexDir={{ base: "column", md: "row" }}
            align={{ md: "center" }}
            width={{ md: "45rem", lg: "58rem" }}
            border={{ md: "1px solid #000" }}
            borderRadius={{ md: "0.5rem" }}
            py={{ md: "1.5rem" }}
            gap={{ base: 2, lg: 6 }}>
            <Flex
              flexDir={"column"}
              alignItems={"center"}
              border={{ base: "1px solid #000", md: "none" }}
              width={["20rem", "25rem"]}
              px={{ base: "1.5rem", md: "0rem" }} py={{ base: "0.7rem", md: "0rem" }}
              borderRadius={"0.5rem"}
              gap={2}>
              <Box>
                <Text color="#a3b1bf" fontSize={{ base: "0.9rem", lg: "1.05rem" }}>
                  {data?.coin.name} ({data?.coin.symbol}) Balance
                </Text>
              </Box>
              <Flex flexDir={{ base: "column", md: "row" }} alignItems={{ base: "center", md: "end" }} justify={"center"} gap={1}>
                <Flex alignItems={"center"} gap={2}>
                  <Image src={data?.coin.thump} width="1.7rem" height="1.7rem" />
                  <Heading fontSize={{ base: "1.85rem", lg: "1.91rem" }} fontWeight={"semibold"}>
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
            <Box
              display={{ base: "none", md: "block" }}
              background="#000"
              width="0.05rem"
              height="100%"
            />
            <Flex
              flexDir={{ base: "row", md: "column" }}
              border={{ base: "1px solid #000", md: "none" }}
              justifyContent={"center"}
              alignItems={"center"}
              width={["20rem", "25rem"]}
              gap={[5, 10, 1]}
              px={{ base: "1.5rem", md: "0rem" }} py={{ base: "0.7rem", md: "0rem" }}
              borderRadius={"0.5rem"}>
              <Flex gap={[5, 10, 9]}>
                <Flex flexDir={"column"} alignItems={"center"} gap={1}>
                  <Text color="#a3b1bf" fontSize={{ base: "0.9rem", lg: "1.05rem" }}>Total Cost</Text>
                  <Text fontWeight={"semibold"} fontSize={{ base: "1.1rem", lg: "1.3rem" }}>
                    $ {data?.coin.cost}
                  </Text>
                </Flex>
                <Flex flexDir={"column"} alignItems={"center"} gap={1}>
                  <Text color="#a3b1bf" fontSize={{ base: "0.9rem", lg: "1.05rem" }}>Quantity</Text>
                  <Text fontWeight={"semibold"} fontSize={{ base: "1.1rem", lg: "1.3rem" }}>
                    {data?.coin.totalQuantity} {data?.coin.symbol}
                  </Text>
                </Flex>
              </Flex>
              <Flex flexDir={"column"} alignItems={"center"} gap={1}>
                <Text color="#a3b1bf" fontSize={{ base: "0.9rem", lg: "1.05rem" }}>Avg Buy price</Text>
                <Text fontWeight={"semibold"} fontSize={{ base: "1.1rem", lg: "1.3rem" }}>
                  $ {data?.coin.averageBuyPrice}
                </Text>
              </Flex>
            </Flex>
            <Box
              display={{ base: "none", md: "block" }}
              background="#000"
              width="0.05rem"
              height="100%"
            />
            <Flex
              border={{ base: "1px solid #000", md: "none" }}
              px={{ base: "2rem", md: "0rem" }}
              py={{ base: "0.7rem", md: "0rem" }}
              width={["20rem", "25rem"]}
              flexDir={"column"}
              alignItems={"center"}
              gap={1}
              borderRadius={"0.5rem"}>
              <Text color="#a3b1bf" fontSize={{ base: "0.9rem", lg: "1.05rem" }}>Total Profit / Loss</Text>
              <Text
                fontWeight="semibold"
                color={getProfitLossColor(data?.coin.profitLoss)}
                fontSize={{ base: "1.1rem", lg: "1.3rem" }}>
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
                <Th textAlign={"center"}>Type</Th>
                <Th textAlign={"center"}>Price</Th>
                <Th textAlign={"center"}>Amount</Th>
                <Th textAlign={"center"}>Actions</Th>
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
                  <Td textAlign={"center"}>
                    <Text>{transaction.type}</Text>
                  </Td>
                  <Td textAlign={"center"}>
                    <Text>$ {transaction.price}</Text>
                  </Td>
                  <Td textAlign={"center"}>
                    <Box>
                      <Text>
                        {transaction.type === 'BUY' ? '-' : '+'}${" "}
                        {parseFloat(transaction.quantity.toString()) *
                          parseFloat(transaction.price.toString())}
                      </Text>
                      <Text
                        color={transaction.type === 'BUY' ? '#8bc53f' : "rgb(255, 0, 0)"}
                        fontWeight="semibold"
                      >
                        {transaction.type === 'BUY' ? '+' : '-'}
                        {transaction.quantity} {data?.coin.name}
                      </Text>
                    </Box>
                  </Td>
                  <Td textAlign={"center"}>
                    <Flex justifyContent={"center"} gap={2}>
                      <Box color="#8bc53f">
                        <BiEdit size={24} />
                      </Box>
                      <Box color="rgb(255, 0, 0)">
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
