import { Flex, Image, Text, useColorMode } from '@chakra-ui/react';
import { TrendingCoin } from '../../../types';

type props = {
  coin: TrendingCoin;
};

export default function TrendingCoins({ coin }: props) {
  const { colorMode } = useColorMode();

  return (
    <Flex align="center" pl={{ xl: "1.5rem" }}>
      <Image src={coin.item.large} maxW={["1.1rem", "1.2rem"]} mr={{ base: "0.7rem", lg: "1.3rem" }} />
      <Text fontSize={["0.8rem", "0.85rem", "0.92rem"]} color={`${colorMode === "light" ? "#000" : "#fff"}`} >
        {coin.item.name}
        <Text fontSize={["0.6rem", "0.65rem"]} as="span" color="rgb(128, 138, 157)" display="inline-block" ml="0.5rem">
          {coin.item.symbol}
        </Text>
      </Text>
    </Flex>
  );
}
