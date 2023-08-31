import { useQuery } from 'react-query';
import { getUserPortfolio } from '../api/axios';
import PortfolioOverview from '../components/PortfolioPage/PortfolioOverview';
import PortfolioTable from '../components/PortfolioPage/PortfolioTable';
import { Box, Spinner } from '@chakra-ui/react';
import Loading from '../utils/Loading';

export default function PortfolioPage() {
  const { data, isLoading, isFetching } = useQuery('userCoins', getUserPortfolio);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box as="section" position="relative">
      {isFetching ? <Spinner position="absolute" top="50%" left="50%" /> : null}
      <PortfolioOverview
        allTimeProfit={data?._allTimeProfit}
        bestPerformer={data?.bestPerformer}
        worstPerformer={data?.worstPerformer}
        portfolioWorth={data?.portfolioWorth}
        cryptoBalance={data?.cryptoBalance}
        dollerBalance={data?.dollerBalance}
      />
      <PortfolioTable coins={data?.coins} />
    </Box>
  );
}
