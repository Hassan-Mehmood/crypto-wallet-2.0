import { useQuery } from 'react-query';
import { getUserTransactions } from '../api/axios';
import PortfolioOverview from '../components/PortfolioPage/PortfolioOverview';
import PortfolioTable from '../components/PortfolioPage/PortfolioTable';

export default function PortfolioPage() {
  const { data } = useQuery('transactions', getUserTransactions);

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
