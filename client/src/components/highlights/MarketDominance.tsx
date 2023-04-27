import { Box, Text, Spinner } from '@chakra-ui/react';

type props = {
  dominance:
    | {
        [key: string]: number;
      }
    | undefined;
  isLoading: boolean;
};

export default function MarketDominance({ dominance, isLoading }: props) {
  if (isLoading) {
    return <Spinner position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" />;
  }

  return (
    <Box mb={3}>
      <Box>
        <Text fontSize={12} color="#000">
          <Text as="span" fontWeight="bold" display="inline-block" mr="1rem" mb={3}>
            BTC
          </Text>
          {dominance?.btc.toFixed(2)}%
        </Text>
        <Text fontSize={12} color="#000">
          <Text as="span" fontWeight="bold" display="inline-block" mr="1rem" mb={3}>
            ETH
          </Text>
          {dominance?.eth.toFixed(2)}%
        </Text>
        <Text fontSize={12} color="#000">
          <Text as="span" fontWeight="bold" display="inline-block" mr="1rem" mb={3}>
            USDT
          </Text>
          {dominance?.usdt.toFixed(2)}%
        </Text>
      </Box>
    </Box>
  );
}
