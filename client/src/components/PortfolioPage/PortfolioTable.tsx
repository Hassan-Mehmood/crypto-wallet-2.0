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
  useColorMode,
} from '@chakra-ui/react';
import { calculatePercentage, getProfitLossColor } from '../../utils/functions';
import DeleteCoinModal from './DeleteCoinModal';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import TransactionModal from './TransactionModal';
import { useDispatch } from 'react-redux';
import { addCoin } from '../../slices/coinSlice';

interface props {
  coins:
    | {
        id: number;
        name: string;
        apiId: string;
        apiSymbol: string;
        symbol: string;
        thump: string;
        large: string;
        marketCapRank: number;
        averageBuyPrice: number;
        latestPrice: number;
        totalQuantity: number;
        holdingsInDollers: number;
        averageNetCost: number;
        profitLoss: number;
        totalInvestment: number;
        userId: number;
        cost: number;
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
  const [coinId, setCoinId] = useState<number | null>(null);
  const [, setCoinName] = useState<string | null>(null);

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const {
    isOpen: isTransactionModalOpen,
    onOpen: onTransactionModelOpen,
    onClose: onTransactionModalClose,
  } = useDisclosure();

  const { colorMode } = useColorMode();

  const dispatch = useDispatch();

  return (
    <>
      <DeleteCoinModal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        id={coinId}
        setCoinId={setCoinId}
      />
      <TransactionModal isOpen={isTransactionModalOpen} onClose={onTransactionModalClose} />

      {coins?.length === 0 ? (
        <Button
          onClick={() => 'onTransactionModelOpen()'}
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

      <TableContainer mt={'2rem'}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th textAlign={'center'}>Name</Th>
              <Th textAlign={'center'}>Price</Th>
              <Th textAlign={'center'}>Holding</Th>
              <Th textAlign={'center'}>Avg Net Cost</Th>
              <Th textAlign={'center'}>Profit/Loss</Th>
              <Th textAlign={'center'}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {coins?.map((coin) => (
              <Tr
                key={coin.id}
                _hover={{
                  backgroundColor: colorMode === 'light' ? '#f4f4f4' : '#212835',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setShowTable('transactionsTable');
                  setActiveCoinId(coin.id);
                }}
              >
                <Td>
                  <Flex alignItems="center" justifyContent={'center'} gap={2} fontWeight="semibold">
                    <Image src={coin.thump} width="25px" height="auto" />
                    {coin.name}
                  </Flex>
                </Td>

                <Td textAlign={'center'}>${coin.latestPrice.toLocaleString('en')}</Td>

                <Td textAlign={'center'}>
                  <Flex flexDirection="column">
                    <Box fontWeight="semibold">
                      {coin.totalQuantity.toFixed(4)}{' '}
                      <Box as="span" fontSize="12px">
                        {coin.symbol}
                      </Box>
                    </Box>
                    <Box fontSize="14px">
                      (${coin.holdingsInDollers.toLocaleString('en', { maximumFractionDigits: 2 })})
                    </Box>
                  </Flex>
                </Td>

                <Td textAlign={'center'}>$ {coin.averageNetCost.toLocaleString('en')}</Td>

                <Td textAlign={'center'} color={getProfitLossColor(coin.profitLoss, colorMode)}>
                  <Flex flexDirection="column">
                    <Box>
                      {coin.profitLoss > 0 ? '+' : ''}$
                      {coin.profitLoss.toLocaleString('en', { maximumFractionDigits: 2 })}
                    </Box>
                    <Box fontSize="14px">{calculatePercentage(coin.profitLoss, coin.cost)}%</Box>
                  </Flex>
                </Td>

                <Td textAlign={'center'}>
                  <Box as="span" display="inline-block" cursor="pointer" mr="0.5rem">
                    {/* ADD ICON */}
                    <IoMdAddCircleOutline
                      size={24}
                      color={colorMode === 'light' ? 'rgb(105, 162, 53)' : '#0facf0'}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCoinName(coin.name);
                        dispatch(
                          addCoin({
                            id: coin.apiId,
                            name: coin.name,
                            api_symbol: coin.apiSymbol,
                            symbol: coin.symbol,
                            market_cap_rank: coin.marketCapRank,
                            thumb: coin.thump,
                            large: coin.large,
                          })
                        );
                        onTransactionModelOpen();
                      }}
                    />
                  </Box>
                  <Box as="span" display="inline-block" cursor="pointer">
                    {/* DELETE ICON */}
                    <AiOutlineDelete
                      size={24}
                      color="rgb(255, 0, 0)"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCoinId(coin.id);
                        onDeleteModalOpen();
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
