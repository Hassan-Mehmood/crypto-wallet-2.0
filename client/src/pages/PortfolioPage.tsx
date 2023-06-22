import { useQuery } from 'react-query';
import { getUserPortfolio } from '../api/axios';
import PortfolioOverview from '../components/PortfolioPage/PortfolioOverview';
import PortfolioTable from '../components/PortfolioPage/PortfolioTable';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';

export default function PortfolioPage() {
  const { data, isLoading, isFetching } = useQuery('userCoins', getUserPortfolio);

  if (isLoading) {
    return (
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100vh"
        backgroundColor="rgba(0,0,0,0.5)"
      >
        <Flex justify="center" align="center" height="100%">
          <Text>Loading... </Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box as="section" position="relative">
      {isFetching ? <Spinner position="absolute" top="50%" left="50%" /> : null}
      <PortfolioOverview
        allTimeProfit={data?.allTimeProfit}
        bestPerformer={data?.bestPerformer}
        worstPerformer={data?.worstPerformer}
        portfolioWorth={data?.portfolioWorth}
      />
      <PortfolioTable coins={data?.coins} />
    </Box>
  );
}
