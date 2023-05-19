import { useQuery } from 'react-query';
import { getUserPortfolio } from '../api/axios';
import PortfolioOverview from '../components/PortfolioPage/PortfolioOverview';
import PortfolioTable from '../components/PortfolioPage/PortfolioTable';

export default function PortfolioPage() {
  const { data } = useQuery('transactions', getUserPortfolio);

  return (
    <>
      <PortfolioOverview
        allTimeProfit={data?.allTimeProfit}
        bestPerformer={data?.bestPerformer}
        worstPerformer={data?.worstPerformer}
        portfolioWorth={data?.portfolioWorth}
      />
      <PortfolioTable coins={data?.coins} />
    </>
  );
}
