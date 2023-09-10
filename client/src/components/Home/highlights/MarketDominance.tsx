import { Box, Text, Spinner, useColorMode } from '@chakra-ui/react';

type props = {
  dominance:
  | {
    [key: string]: number;
  }
  | undefined;
  isLoading: boolean;
};

export default function MarketDominance({ dominance, isLoading }: props) {
  const { colorMode } = useColorMode();
  if (isLoading) {
    return <Spinner position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" />;
  }

  return (
    <Box
      mb={3} width={["10rem", "35vw", "25vw", "20vw"]}
      pl={{ xl: "1rem" }} fontSize={["0.8rem", "0.85rem", "0.92rem"]}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Text as="span" display="inline-block" mr="1rem" mb={3} color={`${colorMode === "light" ? "#000" : "#fff"}`}>
          BTC
        </Text>
        <Text color={`${colorMode === "light" ? "#8bc53f" : "#0facf0"}`} fontWeight={"semibold"}>
          {dominance?.btc.toFixed(2)}%
        </Text>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"} >
        <Text as="span" display="inline-block" mr="1rem" mb={3} color={`${colorMode === "light" ? "#000" : "#fff"}`}>
          ETH
        </Text>
        <Text color={`${colorMode === "light" ? "#8bc53f" : "#0facf0"}`} fontWeight={"semibold"}>
          {dominance?.eth.toFixed(2)}%
        </Text>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"} >
        <Text as="span" display="inline-block" mr="1rem" mb={3} color={`${colorMode === "light" ? "#000" : "#fff"}`}>
          USDT
        </Text>
        <Text color={`${colorMode === "light" ? "#8bc53f" : "#0facf0"}`} fontWeight={"semibold"}>
          {dominance?.usdt.toFixed(2)}%
        </Text>
      </Box>
    </Box>
  );
}
