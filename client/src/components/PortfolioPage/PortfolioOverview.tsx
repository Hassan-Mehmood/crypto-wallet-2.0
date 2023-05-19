import { Text, Image, Box, Flex, Button, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getProfitLossColor } from '../../utils/functions';
import PortfolioSizeModal from './PortfolioSizeModal';

interface props {
  allTimeProfit: number | undefined;
  portfolioWorth: number | undefined;
  bestPerformer:
    | {
        value: number;
        thump: string;
      }
    | undefined;
  worstPerformer:
    | {
        value: number;
        thump: string;
      }
    | undefined;
}

export default function PortfolioOverview({
  allTimeProfit,
  bestPerformer,
  worstPerformer,
  portfolioWorth,
}: props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const { data: accountBalance } = useQuery('accountBalance', getUserBalance);

  return (
    <>
      <PortfolioSizeModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Flex align="center" justify="space-between">
        <Box>
          <Text fontSize={20} mt=".5rem" fontWeight="semibold">
            Portfolio Worth:{' '}
            <Box as="span">
              <>${portfolioWorth}</>
            </Box>
          </Text>
        </Box>

        <Box zIndex="0">
          <Button
            onClick={onOpen}
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
          <Text fontSize={14} color={getProfitLossColor(allTimeProfit)}>
            {allTimeProfit !== undefined && allTimeProfit > 0 ? '+' : ''}$
            {allTimeProfit?.toFixed(2)}
          </Text>
        </Box>
        <Flex ml="3rem" alignItems="center">
          <Box mr=".75rem">
            <Image src={bestPerformer?.thump} />
          </Box>
          <Box>
            <Text mt="1rem" fontSize={14} fontWeight="bold">
              Best Performer
            </Text>
            <Text fontSize={14} color={getProfitLossColor(bestPerformer?.value)}>
              {bestPerformer?.value !== undefined && bestPerformer?.value > 0 ? '+' : ''}$
              {bestPerformer?.value.toFixed(2)}
            </Text>
          </Box>
        </Flex>
        <Flex ml="3rem" alignItems="center">
          <Box mr="0.75rem">
            <Image src={worstPerformer?.thump} />
          </Box>
          <Box>
            <Text mt="1rem" fontSize={14} fontWeight="bold">
              Worst Performer
            </Text>
            <Text fontSize={14} color={getProfitLossColor(worstPerformer?.value)}>
              {worstPerformer?.value !== undefined && worstPerformer?.value > 0 ? '+' : ''}$
              {worstPerformer?.value.toFixed(2)}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
