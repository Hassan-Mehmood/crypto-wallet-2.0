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
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { calculatePercentage, getProfitLossColor } from '../../utils/functions';
import { Trash2 } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import DeleteCoinModal from './DeleteCoinModal';
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
  setShowTable: React.Dispatch<React.SetStateAction<string>>;
  setActiveCoinId: React.Dispatch<React.SetStateAction<number>>;
}

export default function PortfolioTable({ coins, setShowTable, setActiveCoinId }: props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [coinId, setCoinId] = useState<number | null>(null);

  return (
    <>
      <DeleteCoinModal isOpen={isOpen} onClose={onClose} id={coinId} setCoinId={setCoinId} />
      {coins?.length === 0 ? (
        <Button
          onClick={() => navigate('/addCoin')}
          position="absolute"
          top="150%"
          left="50%"
          transform="translate(-50%, -150%)"
          fontSize="sm"
          borderRadius="8px"
          color="#fff"
          background="rgb(105, 162, 53)"
          padding={'0 16px'}
          border="1px solid rgb(105, 162, 53)"
          _hover={{
            background: 'rgb(81, 126, 39)',
          }}
        >
          Add Coins
        </Button>
      ) : null}

      <TableContainer mt={"2rem"}>
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
              <Tr
                key={coin.id}
                _hover={{ backgroundColor: '#f4f4f4', cursor: 'pointer' }}
                onClick={() => {
                  setShowTable('transactionsTable');
                  setActiveCoinId(coin.id);
                }}
              >
                <Td>
                  <Flex alignItems="center">
                    <Image src={coin.thump} width="25px" height="auto" mr="5px" />
                    {coin.name}
                  </Flex>
                </Td>
                <Td>${coin.latestPrice.toLocaleString('en')}</Td>
                <Td>
                  <Flex flexDirection="column">
                    <Box fontWeight="bold">
                      {coin.totalQuantity}{' '}
                      <Box as="span" fontSize="12px">
                        {coin.symbol}
                      </Box>
                    </Box>
                    <Box fontSize="14px">
                      (${coin.holdingsInDollers.toLocaleString('en', { maximumFractionDigits: 2 })})
                    </Box>
                  </Flex>
                </Td>
                <Td>${coin.averageBuyPrice.toLocaleString('en')}</Td>
                <Td color={getProfitLossColor(coin.profitLoss)}>
                  <Flex flexDirection="column">
                    <Box>
                      {coin.profitLoss > 0 ? '+' : ''}$
                      {coin.profitLoss.toLocaleString('en', { maximumFractionDigits: 2 })}
                    </Box>
                    <Box fontSize="14px">
                      {calculatePercentage(coin.holdingsInDollers, coin.totalInvestment, coin.cost)}
                      %
                    </Box>
                  </Flex>
                </Td>
                <Td>
                  <Box as="span" display="inline-block" cursor="pointer">
                    <Trash2
                      color="maroon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCoinId(coin.id);
                        onOpen();
                      }}
                    />
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
