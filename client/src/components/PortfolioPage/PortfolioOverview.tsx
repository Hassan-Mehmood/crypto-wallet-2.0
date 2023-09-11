import { Text, Image, Box, Flex, Button, useDisclosure, useColorMode } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getProfitLossColor } from '../../utils/functions';
import PortfolioSizeModal from './PortfolioSizeModal';

interface props {
  allTimeProfit: number | undefined;
  portfolioWorth: number | undefined;
  dollerBalance: number | undefined;
  cryptoBalance: number | undefined;
  bestPerformer:
  | {
    value: number;
    thump: string;
  }
  | undefined;
  worstPerformer:
  | {
    value: number;
    thump: string;
  }
  | undefined;
}

export default function PortfolioOverview({
  allTimeProfit,
  bestPerformer,
  worstPerformer,
  portfolioWorth,
  cryptoBalance,
  dollerBalance,
}: props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      mb={"4rem"}>
      <Flex
        flexDir={{ base: "column", xl: "row" }}
        border={{ xl: `1px solid ${colorMode === "light" ? "#000" : "#fff"}` }}
        borderRadius={{ xl: "0.5rem" }}
        px={{ xl: "2rem" }}
        gap={{ xl: 12 }}>
        <PortfolioSizeModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent={{ md: "space-between" }}
          gap={{ base: 6, md: 0 }}
          px={{ md: "2rem", xl: "0rem" }}
          border={{ md: `1px solid ${colorMode === "light" ? "#000" : "#fff"}`, xl: "0px" }}
          borderRadius={"0.5rem"}
          py={{ md: "1.9rem", lg: "2.2rem" }}
          width={{ md: "45.5rem", lg: "55rem" }}
        >
          <Flex
            flexDir={{ base: "column", md: "row" }}
            alignItems={"center"}
            gap={{ base: 2, md: 6, lg: 12 }}>
            <Flex
              flexDir={"column"}
              gap={{ md: 3 }}
              alignItems={"center"}
              width={["20rem", "25rem", "fit-content"]}
              borderRadius={{ base: "0.5rem", md: "0rem" }}
              border={{ base: `1px solid ${colorMode === "light" ? "#000" : "#fff"}`, md: "0px" }}
              py={"0.95rem"}
            >
              <Text fontSize={{ base: "1rem", md: "0.85rem", lg: "0.92rem" }} fontWeight={{ base: "medium", md: "semibold" }}>
                Portfolio Worth
              </Text>
              <Text fontSize={{ base: "1.25rem", lg: "1.5rem" }} fontWeight="semibold">
                $ {portfolioWorth?.toLocaleString('en', { maximumFractionDigits: 2 })}
              </Text>
            </Flex>
            <Box
              display={{ base: "none", md: "block" }}
              background={colorMode === "light" ? "#000" : "#fff"}
              width="0.05rem"
              height="100%"
            />
            <Flex
              flexDir={"column"}
              gap={{ md: 3 }}
              alignItems={"center"}
              width={["20rem", "25rem", "fit-content"]}
              borderRadius={{ base: "0.5rem", md: "0rem" }}
              border={{ base: `1px solid ${colorMode === "light" ? "#000" : "#fff"}`, md: "0px" }}
              py={"0.95rem"}
            >
              <Text fontSize={{ base: "1rem", md: "0.85rem", lg: "0.92rem" }} fontWeight={{ base: "medium", md: "semibold" }}>
                Crypto Balance
              </Text>
              <Text fontSize={{ base: "1.25rem", lg: "1.5rem" }} fontWeight="semibold">
                $ {cryptoBalance?.toLocaleString('en', { maximumFractionDigits: 2 })}
              </Text>
            </Flex>
            <Box
              display={{ base: "none", md: "block" }}
              background={colorMode === "light" ? "#000" : "#fff"}
              width="0.05rem"
              height="100%"
            />
            <Flex
              flexDir={"column"}
              gap={{ md: 3 }}
              alignItems={"center"}
              width={["20rem", "25rem", "fit-content"]}
              borderRadius={{ base: "0.5rem", md: "0rem" }}
              border={{ base: `1px solid ${colorMode === "light" ? "#000" : "#fff"}`, md: "0px" }}
              py={"0.95rem"}
            >
              <Text fontSize={{ base: "1rem", md: "0.85rem", lg: "0.92rem" }} fontWeight={{ base: "medium", md: "semibold" }}>
                Doller Balance
              </Text>
              <Text fontSize={{ base: "1.25rem", lg: "1.5rem" }} fontWeight="semibold">
                $ {dollerBalance?.toLocaleString('en', { maximumFractionDigits: 2 })}
              </Text>
            </Flex>
            <Box
              display={{ base: "none", md: "block" }}
              background={colorMode === "light" ? "#000" : "#fff"}
              width="0.05rem"
              height="100%"
            />
          </Flex>
          <Flex
            flexDir={{ md: "column" }}
            justifyContent={"center"}
            alignItems={"center"}
            gap={{ md: 2 }}>
            <Text
              color={"#a3b1bf"}
              align={"center"}
              fontSize={"0.8rem"}
              fontWeight={"semibold"}
              display={{ base: "none", md: "block" }}
              width={"9.5rem"}>
              Manage  Or Add Coins To Your Portfolio.
            </Text>
            <Flex
              flexDir={{ base: "row", md: "row" }}
              width={["20rem", "25rem", "14.5rem"]}
              justifyContent={"space-between"}>
              <Button
                onClick={onOpen}
                width={["9.5rem", "12rem", "7rem"]}
                fontSize={{ base: "1rem", md: "0.9rem" }}
                border={`1px solid ${colorMode === "light" ? "#8bc53f" : "#0facf0"}`}
                borderRadius="4px"
                color={colorMode === "light" ? "#fff" : "#1a202c"}
                background={colorMode === "light" ? "#8bc53f" : "#0facf0"}
                py={'1.3rem'}
                _hover={{
                  background: 'none',
                  color: colorMode === "light" ? "#8bc53f" : "#0facf0",
                }}
              >
                Portfolio Size
              </Button>
              <Button
                onClick={() => navigate('/addcoin')}
                fontSize={{ base: "1rem", md: "0.9rem" }}
                width={["9.5rem", "12rem", "7rem"]}
                border={`1px solid ${colorMode === "light" ? "#8bc53f" : "#0facf0"}`}
                borderRadius="4px"
                color={colorMode === "light" ? "#fff" : "#1a202c"}
                background={colorMode === "light" ? "#8bc53f" : "#0facf0"}
                py={'1.3rem'}
                _hover={{
                  background: 'none',
                  color: colorMode === "light" ? "#8bc53f" : "#0facf0",
                }}
              >
                Add Coins
              </Button>
            </Flex>
          </Flex>
          <Box
            display={{ base: "none", xl: "block" }}
            background="#000"
            width="0.05rem"
            height="100%"
          />
        </Flex>

        <Flex
          mt={{ base: "2rem", xl: "0rem" }}
          flexDir={{ base: "row", xl: "column" }}
          justifyContent={"center"}
          align="center"
          gap={[8, 16, 20, 24, 3]}
        >
          <Flex gap={[8, 16, 20, 24, 6]}>
            <Flex flexDir={"column"} alignItems={"center"} gap={{ base: 2, xl: 0 }}>
              <Text fontSize={"0.85rem"} fontWeight="semibold">
                All Time Profit
              </Text>
              <Text fontSize={{ base: "1.05rem", xl: "0.9rem" }} color={getProfitLossColor(allTimeProfit, colorMode)}>
                {allTimeProfit !== undefined && allTimeProfit > 0 ? '+' : ''}$
                {allTimeProfit?.toFixed(2)}
              </Text>
            </Flex>
            <Flex alignItems="center">
              <Flex flexDir={"column"} alignItems={"center"} gap={{ base: 2, xl: 0 }}>
                <Text fontSize={"0.85rem"} fontWeight="semibold">
                  Best Performer
                </Text>
                <Flex alignItems={"center"}>
                  <Image src={bestPerformer?.thump} width={{ base: '1.3rem', xl: '1rem' }} mr={"0.2rem"} />
                  <Text fontSize={{ base: "1.05rem", xl: "0.9rem" }} color={getProfitLossColor(bestPerformer?.value, colorMode)}>
                    {bestPerformer?.value !== undefined && bestPerformer?.value > 0 ? '+' : ''}$
                    {bestPerformer?.value.toFixed(2)}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex alignItems="center">
            <Flex flexDir={"column"} alignItems={"center"} gap={{ base: 2, xl: 0 }}>
              <Text fontSize={"0.85rem"} fontWeight="semibold">
                Worst Performer
              </Text>
              <Flex alignItems={"center"}>
                <Image src={worstPerformer?.thump} width={{ base: '1.3rem', xl: '1rem' }} mr={"0.2rem"} />
                <Text fontSize={{ base: "1.05rem", xl: "0.9rem" }} color={getProfitLossColor(worstPerformer?.value, colorMode)}>
                  {worstPerformer?.value !== undefined && worstPerformer?.value > 0 ? '+' : ''}$
                  {worstPerformer?.value.toFixed(2)}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
