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
    <Box mb={3} >
      <Box fontSize={["0.8rem", "0.85rem", "0.92rem"]} color="#000" width={["25vw", "28vw", "12rem", "14rem"]} display={"flex"} justifyContent={"space-between"} fontWeight="semibold">
        <Text as="span" display="inline-block" mr="1rem" mb={3}>
          BTC
        </Text>
        <Text color={"#8bc53f"}>
          {dominance?.btc.toFixed(2)}%
        </Text>
      </Box>
      <Box fontSize={["0.8rem", "0.85rem", "0.92rem"]} color="#000" width={["25vw", "28vw", "12rem", "14rem"]} display={"flex"} justifyContent={"space-between"} fontWeight={"semibold"}>
        <Text as="span" display="inline-block" mr="1rem" mb={3}>
          ETH
        </Text>
        <Text color={"#8bc53f"}>
          {dominance?.eth.toFixed(2)}%
        </Text>
      </Box>
      <Box fontSize={["0.8rem", "0.85rem", "0.92rem"]} color="#000" width={["25vw", "28vw", "12rem", "14rem"]} display={"flex"} justifyContent={"space-between"} fontWeight={"semibold"}>
        <Text as="span" display="inline-block" mr="1rem" mb={3}>
          USDT
        </Text>
        <Text color={"#8bc53f"}>
          {dominance?.usdt.toFixed(2)}%
        </Text>
      </Box>
    </Box>
  );
}
