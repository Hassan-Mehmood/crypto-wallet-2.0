import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { TrendingCoin } from '../../../types';

export default function TrendingCoins({ item }: TrendingCoin) {
  return (
    <Box mb={3} key={item.coin_id}>
      <Box>
        <Flex align="center">
          <Image src={item.large} maxW="1rem" mr="0.5rem" />
          <Text fontSize={12} color="#000" fontWeight={'bold'}>
            {item.name}
            <Text as="span" color="rgb(128, 138, 157)" display="inline-block" ml="0.5rem">
              {item.symbol}
            </Text>
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
