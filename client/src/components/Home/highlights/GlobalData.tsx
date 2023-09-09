import { Box, Spinner, Text, useColorMode } from '@chakra-ui/react';

type props = {
  activeCurrencies: number | undefined;
  markets: number | undefined;
  icos: number | undefined;
  isLoading: boolean;
};

export default function GlobalData({ activeCurrencies, markets, icos, isLoading }: props) {
  const { colorMode } = useColorMode();

  if (isLoading) {
    return <Spinner position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" />;
  }

  return (
    <Box mb={3}>
      <Box>
        <Box fontSize={["0.8rem", "0.85rem", "0.92rem"]} color="#000" width={"full"} display={"flex"} justifyContent={"space-between"}>
          <Text as="span" display="inline-block" mb={3} fontSize={["0.8rem", "0.85rem", "0.92rem"]} color={`${colorMode === "light" ? "#000" : "#fff"}`}>
            Active Currencies
          </Text>
          <Text color={"#8bc53f"} >
            {activeCurrencies}
          </Text>
        </Box>
        <Box fontSize={["0.8rem", "0.85rem", "0.92rem"]} color="#000" width={"full"} display={"flex"} justifyContent={"space-between"}>
          <Text as="span" display="inline-block" mb={3}>
            Markets
          </Text>
          <Text color={"#8bc53f"} >
            {markets}
          </Text>
        </Box>
        <Box fontSize={["0.8rem", "0.85rem", "0.92rem"]} color="#000" width={"full"} display={"flex"} justifyContent={"space-between"}>
          <Text as="span" display="inline-block" mb={3}>
            Initial Coin Offerings
          </Text>
          <Text color={"#8bc53f"} >
            {icos}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
