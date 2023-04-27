import { Box, Spinner, Text } from '@chakra-ui/react';

type props = {
  activeCurrencies: number | undefined;
  markets: number | undefined;
  icos: number | undefined;
  isLoading: boolean;
};

export default function GlobalData({ activeCurrencies, markets, icos, isLoading }: props) {
  if (isLoading) {
    return <Spinner position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" />;
  }

  return (
    <Box mb={3}>
      <Box>
        <Text fontSize={12} color="#000">
          <Text as="span" fontWeight="bold" display="inline-block" mr="1rem" mb={3}>
            Active Currencies
          </Text>
          {activeCurrencies}
        </Text>
        <Text fontSize={12} color="#000">
          <Text as="span" fontWeight="bold" display="inline-block" mr="1rem" mb={3}>
            Markets
          </Text>
          {markets}
        </Text>
        <Text fontSize={12} color="#000">
          <Text as="span" fontWeight="bold" display="inline-block" mr="1rem" mb={3}>
            Initial Coin Offerings
          </Text>
          {icos}
        </Text>
      </Box>
    </Box>
  );
}
