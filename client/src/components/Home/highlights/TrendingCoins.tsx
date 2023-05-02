import { Box, Flex, Image, Spinner, Text } from '@chakra-ui/react';
import { TrendingCoin } from '../../../types';

type props = {
  coin: TrendingCoin;
};

export default function TrendingCoins({ coin }: props) {
  return (
    <Box mb={3}>
      <Box>
        <Flex align="center">
          <Image src={coin.item.large} maxW="1rem" mr="0.5rem" />
          <Text fontSize={12} color="#000" fontWeight={'bold'}>
            {coin.item.name}
            <Text as="span" color="rgb(128, 138, 157)" display="inline-block" ml="0.5rem">
              {coin.item.symbol}
            </Text>
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
