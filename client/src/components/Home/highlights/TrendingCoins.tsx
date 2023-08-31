import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { TrendingCoin } from '../../../types';

type props = {
  coin: TrendingCoin;
};

export default function TrendingCoins({ coin }: props) {
  return (
    <Box mb={3}>
      <Box>
        <Flex align="center">
          <Image src={coin.item.large} maxW={["1.1rem", "1.2rem"]} mr="0.7rem" />
          <Text fontSize={["0.8rem", "0.85rem", "0.92rem"]} color="#000" fontWeight={'semibold'}>
            {coin.item.name}
            <Text fontSize={["0.6rem", "0.7rem"]} as="span" color="rgb(128, 138, 157)" display="inline-block" ml="0.5rem">
              {coin.item.symbol}
            </Text>
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
