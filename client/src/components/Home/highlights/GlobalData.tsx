import { Flex, Spinner, Text, useColorMode } from '@chakra-ui/react';

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
    <Flex
      flexDir={"column"}
      gap={3}
      width={["10rem", "35vw", "25vw", "20vw"]}
      pl={{ xl: "1.5rem" }}
      fontSize={["0.8rem", "0.85rem", "0.92rem"]}
    >
      <Flex justifyContent={"space-between"}>
        <Text color={`${colorMode === "light" ? "#000" : "#fff"}`}>
          Active Currencies
        </Text>
        <Text color={colorMode === "light" ? "#8bc53f" : "#0facf0"} fontWeight={"semibold"}>
          {activeCurrencies}
        </Text>
      </Flex>
      <Flex justifyContent={"space-between"}>
        <Text color={colorMode === "light" ? "#000" : "#fff"}>
          Markets
        </Text>
        <Text color={colorMode === "light" ? "#8bc53f" : "#0facf0"} fontWeight={"semibold"}>
          {markets}
        </Text>
      </Flex>
      <Flex justifyContent={"space-between"}>
        <Text color={colorMode === "light" ? "#000" : "#fff"}>
          Initial Coin Offerings
        </Text>
        <Text color={colorMode === "light" ? "#8bc53f" : "#0facf0"} fontWeight={"semibold"}>
          {icos}
        </Text>
      </Flex>
    </Flex>
  );
}
