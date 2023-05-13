import { useQuery } from 'react-query';
import { getUserTransactions } from '../api/axios';
import PortfolioOverview from '../components/PortfolioPage/PortfolioOverview';
import PortfolioTable from '../components/PortfolioPage/PortfolioTable';
import { Spinner } from '@chakra-ui/react';

export default function PortfolioPage() {
  const { data, isLoading } = useQuery('transactions', getUserTransactions);
  return (
    <>
      <PortfolioOverview
        allTimeProfit={data?.allTimeProfit}
        bestPerformer={data?.bestPerformer}
        worstPerformer={data?.worstPerformer}
      />
      <PortfolioTable coins={data?.coins} />
    </>
  );
}
