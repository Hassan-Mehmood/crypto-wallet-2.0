import { Box, Text } from '@chakra-ui/react';

type props = {
  dominance: {
    [key: string]: number | undefined;
  };
};

export default function MarketDominance({ dominance }: props) {
  return (
    <Box mb={3}>
      <Box>
        <Text fontSize={12} color="#000">
          <Text as="span" fontWeight="bold" display="inline-block" mr="1rem" mb={3}>
            Active Currencies
          </Text>
        </Text>
        <Text fontSize={12} color="#000">
          <Text as="span" fontWeight="bold" display="inline-block" mr="1rem" mb={3}>
            Markets
          </Text>
        </Text>
        <Text fontSize={12} color="#000">
          <Text as="span" fontWeight="bold" display="inline-block" mr="1rem" mb={3}>
            Initial Coin Offerings
          </Text>
        </Text>
      </Box>
    </Box>
  );
}
