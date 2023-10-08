import { Box, Button, Flex, Heading, Image, Skeleton, Text, useColorMode } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
import { getProfitLossColor, calculatePercentage } from '../../utils/functions';
import { coinTransaction } from '../../types';

interface props {
  setShowTable: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  data: coinTransaction | undefined;
}

export default function TransactionsOverview({ setShowTable, isLoading, data }: props) {
  const { colorMode } = useColorMode();

  return (
    <>
      <Button
        display={'flex'}
        mb={'1rem'}
        alignItems={'center'}
        marginLeft={'2rem'}
        backgroundColor={'transparent'}
        px={0}
        gap={1}
        _hover={{
          backgroundColor: 'none',
          color: colorMode === 'light' ? '#8bc53f' : '#0facf0',
        }}
        _active={{
          backgroundColor: 'none',
        }}
      >
        <BiArrowBack />
        <Text fontSize={'1.2rem'} onClick={() => setShowTable('coinsTable')}>
          Back
        </Text>
      </Button>

      <Skeleton isLoaded={!isLoading}>
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          align={{ md: 'center' }}
          justify={'space-around'}
          width={'100%'}
          p={{ md: '1.5rem' }}
          gap={{ base: 2, lg: 6 }}
          mb={{ md: '4rem' }}
        >
          <Flex
            flexDir={'column'}
            alignItems={'center'}
            px={{ base: '1.5rem', md: '0rem' }}
            py={{ base: '0.7rem', md: '0rem' }}
            gap={2}
          >
            <Box>
              <Text color="#a3b1bf" fontSize={{ base: '0.9rem', lg: '1.05rem' }}>
                {data?.coin.name} ({data?.coin.symbol}) Balance
              </Text>
            </Box>
            <Flex
              flexDir={{ base: 'column', md: 'row' }}
              alignItems={{ base: 'center', md: 'end' }}
              justify={'center'}
              gap={1}
            >
              <Flex alignItems={'center'} gap={2}>
                <Image src={data?.coin.thump} width="1.7rem" height="1.7rem" />
                <Heading fontSize={{ base: '1.85rem', lg: '1.91rem' }} fontWeight={'semibold'}>
                  ${data?.coin.holdingsInDollers.toLocaleString('en')}
                </Heading>
              </Flex>
            </Flex>
          </Flex>

          <Flex
            flexDir={{ base: 'row', md: 'column' }}
            justifyContent={'center'}
            alignItems={'center'}
            gap={[5, 10, 1]}
            px={{ base: '1.5rem', md: '0rem' }}
            py={{ base: '0.7rem', md: '0rem' }}
            borderRadius={'0.5rem'}
          >
            <Flex gap={[5, 10, 9]}>
              <Box textAlign="center">
                <Text color="#a3b1bf" fontSize={{ base: '0.9rem', lg: '1.05rem' }}>
                  Total Cost
                </Text>
                <Text fontWeight={'semibold'} fontSize={{ base: '1.1rem', lg: '1.3rem' }}>
                  ${data?.coin.cost.toFixed(3)}
                </Text>
              </Box>
              <Box textAlign="center">
                <Text color="#a3b1bf" fontSize={{ base: '0.9rem', lg: '1.05rem' }}>
                  Quantity
                </Text>
                <Text fontWeight={'semibold'} fontSize={{ base: '1.1rem', lg: '1.3rem' }}>
                  {data?.coin.totalQuantity.toFixed(3)} {data?.coin.symbol}
                </Text>
              </Box>
              <Box>
                <Text color="#a3b1bf" fontSize={{ base: '0.9rem', lg: '1.05rem' }}>
                  Avg net cost
                </Text>
                <Text fontWeight={'semibold'} fontSize={{ base: '1.1rem', lg: '1.3rem' }}>
                  ${data?.coin.averageNetCost?.toFixed(3) || '0'}
                </Text>
              </Box>
            </Flex>
          </Flex>

          <Flex
            px={{ base: '2rem', md: '0rem' }}
            py={{ base: '0.7rem', md: '0rem' }}
            flexDir={'column'}
            alignItems={'center'}
            gap={1}
            borderRadius={'0.5rem'}
          >
            <Text color="#a3b1bf" fontSize={{ base: '0.9rem', lg: '1.05rem' }}>
              Total Profit / Loss
            </Text>
            <Text
              fontWeight="semibold"
              color={getProfitLossColor(data?.coin.profitLoss, colorMode)}
              fontSize={{ base: '1.1rem', lg: '1.3rem' }}
            >
              {calculatePercentage(data?.coin.profitLoss, data?.coin.cost)}% [$
              {data?.coin.profitLoss.toLocaleString('en', { maximumFractionDigits: 2 })}]
            </Text>
          </Flex>
        </Flex>
      </Skeleton>
    </>
  );
}
