import { Flex, Image, Text, useColorMode } from '@chakra-ui/react';
import { getProfitLossColor } from '../../utils/functions';

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

export default function PortfolioStats({
  allTimeProfit,
  bestPerformer,
  worstPerformer,
  portfolioWorth,
  cryptoBalance,
  dollerBalance,
}: props) {
  const { colorMode } = useColorMode();

  return (
    <Flex
      flexDir={{ base: 'column', lg: 'row' }}
      justifyContent={{ md: 'space-around' }}
      gap={{ base: 6, md: '4rem' }}
      px={{ md: '2rem', xl: '0rem' }}
      py={{ base: '1.9rem', lg: '2.2rem' }}
      width={'100%'}
    >
      <Flex
        flex={1}
        flexDir={{ base: 'column', sm: 'row' }}
        alignItems={'center'}
        justifyContent={{ base: 'center', lg: 'space-between' }}
        gap={{ base: 2, md: 20, lg: 12 }}
      >
        <Flex
          flexDir={'column'}
          gap={{ md: 3 }}
          alignItems={'center'}
          width={['20rem', '25rem', 'fit-content']}
          py={'0.95rem'}
        >
          <Text
            fontSize={{ base: '1rem', md: '0.85rem', lg: '0.92rem' }}
            fontWeight={{ base: 'medium', md: 'semibold' }}
          >
            Portfolio Worth
          </Text>
          <Text fontSize={{ base: '1.25rem', lg: '1.5rem' }} fontWeight="semibold">
            $ {portfolioWorth?.toLocaleString('en', { maximumFractionDigits: 2 })}
          </Text>
        </Flex>

        <Flex
          flexDir={'column'}
          gap={{ md: 3 }}
          alignItems={'center'}
          width={['20rem', '25rem', 'fit-content']}
          borderRadius={{ base: '0.5rem', md: '0rem' }}
          py={'0.95rem'}
        >
          <Text
            fontSize={{ base: '1rem', md: '0.85rem', lg: '0.92rem' }}
            fontWeight={{ base: 'medium', md: 'semibold' }}
          >
            Crypto Balance
          </Text>
          <Text fontSize={{ base: '1.25rem', lg: '1.5rem' }} fontWeight="semibold">
            $ {cryptoBalance?.toLocaleString('en', { maximumFractionDigits: 2 })}
          </Text>
        </Flex>

        <Flex
          flexDir={'column'}
          gap={{ md: 3 }}
          alignItems={'center'}
          width={['20rem', '25rem', 'fit-content']}
          borderRadius={{ base: '0.5rem', md: '0rem' }}
          py={'0.95rem'}
        >
          <Text
            fontSize={{ base: '1rem', md: '0.85rem', lg: '0.92rem' }}
            fontWeight={{ base: 'medium', md: 'semibold' }}
          >
            Dollar Balance
          </Text>
          <Text fontSize={{ base: '1.25rem', lg: '1.5rem' }} fontWeight="semibold">
            $ {dollerBalance?.toLocaleString('en', { maximumFractionDigits: 2 })}
          </Text>
        </Flex>
      </Flex>

      <Flex
        mt={{ base: '0', xl: '0rem' }}
        flexDir={{ base: 'row', xl: 'column' }}
        justifyContent={'center'}
        align="center"
        flex={1}
        gap={[8, 16, 20, 24, 3]}
      >
        <Flex gap={[8, 16, 20, 24, 6]}>
          <Flex flexDir={'column'} alignItems={'center'} gap={{ base: 2, xl: 0 }}>
            <Text fontSize={'1rem'} fontWeight="semibold">
              All Time Profit
            </Text>
            <Text
              fontSize={{ base: '1.25rem', lg: '1.5rem' }}
              color={getProfitLossColor(allTimeProfit, colorMode)}
            >
              {allTimeProfit !== undefined && allTimeProfit > 0 ? '+' : ''}$
              {allTimeProfit?.toFixed(2) || '0.00'}
            </Text>
          </Flex>
          <Flex alignItems="center">
            <Flex flexDir={'column'} alignItems={'center'} gap={{ base: 2, xl: 0 }}>
              <Text fontSize={'1rem'} fontWeight="semibold">
                Best Performer
              </Text>
              <Flex alignItems={'center'}>
                <Image
                  src={bestPerformer?.thump}
                  width={{ base: '1.3rem', xl: '1rem' }}
                  mr={'0.2rem'}
                />
                <Text
                  fontSize={{ base: '1.25rem', lg: '1.5rem' }}
                  color={getProfitLossColor(bestPerformer?.value, colorMode)}
                >
                  {bestPerformer?.value !== undefined && bestPerformer?.value > 0 ? '+' : ''}$
                  {bestPerformer?.value.toFixed(2)}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex alignItems="center">
          <Flex flexDir={'column'} alignItems={'center'} gap={{ base: 2, xl: 0 }}>
            <Text fontSize={'1rem'} fontWeight="semibold">
              Worst Performer
            </Text>
            <Flex alignItems={'center'}>
              <Image
                src={worstPerformer?.thump}
                width={{ base: '1.3rem', xl: '1rem' }}
                mr={'0.2rem'}
              />
              <Text
                fontSize={{ base: '1.25rem', lg: '1.5rem' }}
                color={getProfitLossColor(worstPerformer?.value, colorMode)}
              >
                {worstPerformer?.value !== undefined && worstPerformer?.value > 0 ? '+' : ''}$
                {worstPerformer?.value.toFixed(2)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
