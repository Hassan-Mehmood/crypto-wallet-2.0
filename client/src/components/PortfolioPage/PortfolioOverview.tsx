import { Text, Image, Box, Flex, Button, useDisclosure } from '@chakra-ui/react';
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

  return (
    <>
      <PortfolioSizeModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Flex flexDir={"column"} gap={6}>
        <Flex flexDir={"column"} alignItems={"center"} gap={2}>
          <Flex
            background="rgba(255, 255, 255, 0.2)"
            flexDir={"column"}
            alignItems={"center"}
            width={["20rem"]}
            borderRadius="0.5rem"
            boxShadow=" 0 2px 4px rgba(0, 0, 0, 0.1)"
            backdropFilter="blur(10px)"
            // border="1px solid rgba(255, 255, 255, 0.3)"
            border={"1.5px solid black"}
            py={"0.65rem"}
          >
            <Text fontSize={"1.05rem"}>
              Portfolio Worth
            </Text>
            <Text fontSize={"1.2rem"} fontWeight="semibold">
              ${portfolioWorth?.toLocaleString('en', { maximumFractionDigits: 2 })}
            </Text>
          </Flex>
          <Flex
            background="rgba(255, 255, 255, 0.2)"
            flexDir={"column"}
            alignItems={"center"}
            width={["20rem"]}
            borderRadius="0.5rem"
            boxShadow=" 0 2px 4px rgba(0, 0, 0, 0.1)"
            backdropFilter="blur(10px)"
            // border="1px solid rgba(255, 255, 255, 0.3)"
            border={"1.5px solid black"}
            py={"0.65rem"}

          >
            <Text fontSize={"1.05rem"}>
              Crypto Balance
            </Text>
            <Text fontSize={"1.2rem"} fontWeight="semibold">
              ${cryptoBalance?.toLocaleString('en', { maximumFractionDigits: 2 })}
            </Text>
          </Flex>
          <Flex
            background="rgba(255, 255, 255, 0.2)"
            flexDir={"column"}
            alignItems={"center"}
            width={["20rem"]}
            borderRadius="0.5rem"
            boxShadow=" 0 2px 4px rgba(0, 0, 0, 0.1)"
            backdropFilter="blur(10px)"
            // border="1px solid rgba(255, 255, 255, 0.3)"
            border={"1.5px solid black"}
            py={"0.65rem"}

          >
            <Text fontSize={"1.05rem"}>
              Doller Balance
            </Text>
            <Text fontSize={"1.2rem"} fontWeight="semibold">
              ${dollerBalance?.toLocaleString('en', { maximumFractionDigits: 2 })}
            </Text>
          </Flex>
        </Flex>

        <Flex justifyContent={"center"}>
          <Flex
            width={["20rem"]}
            justifyContent={"space-between"}>
            <Button
              onClick={onOpen}
              width={"9.5rem"}
              fontSize="1rem"
              border={"1.5px solid #8bc53f"}
              borderRadius="4px"
              color="#fff"
              background="#8bc53f"
              py={'1.3rem'}
              _hover={{
                background: "#fff",
                color: "#8bc53f"
              }}
            >
              Portfolio Size
            </Button>
            <Button
              onClick={() => navigate('/addcoin')}
              fontSize="1rem"
              width={"9.5rem"}
              border={"1.5px solid #8bc53f"}
              borderRadius="4px"
              color="#fff"
              background="#8bc53f"
              py={'1.3rem'}
              _hover={{
                background: "#fff",
                color: "#8bc53f"
              }}
            >
              Add Coins
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex justifyContent={"center"} align="center" mt="2rem" gap={8}>
        <Flex flexDir={"column"} alignItems={"center"} gap={2}>
          <Text fontSize={"0.85rem"} fontWeight="semibold">
            All Time Profit
          </Text>
          <Text fontSize={"1.05rem"} color={getProfitLossColor(allTimeProfit)}>
            {allTimeProfit !== undefined && allTimeProfit > 0 ? '+' : ''}$
            {allTimeProfit?.toFixed(2)}
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Flex flexDir={"column"} alignItems={"center"} gap={2}>
            <Text fontSize={"0.85rem"} fontWeight="semibold">
              Best Performer
            </Text>
            <Flex alignItems={"center"}>
              <Image src={bestPerformer?.thump} width={'1.3rem'} mr={"0.2rem"}/>
              <Text fontSize={"1.05rem"} color={getProfitLossColor(bestPerformer?.value)}>
                {bestPerformer?.value !== undefined && bestPerformer?.value > 0 ? '+' : ''}$
                {bestPerformer?.value.toFixed(2)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex alignItems="center">
          <Flex flexDir={"column"} alignItems={"center"} gap={2}>
            <Text fontSize={"0.85rem"} fontWeight="semibold">
              Worst Performer
            </Text>
            <Flex alignItems={"center"}>
              <Image src={worstPerformer?.thump} width={'1.3rem'} mr={"0.2rem"}/>
              <Text fontSize={"1.05rem"} color={getProfitLossColor(worstPerformer?.value)}>
                {worstPerformer?.value !== undefined && worstPerformer?.value > 0 ? '+' : ''}$
                {worstPerformer?.value.toFixed(2)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
