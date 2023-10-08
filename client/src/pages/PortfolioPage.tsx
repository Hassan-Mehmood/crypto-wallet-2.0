import { useQuery } from 'react-query';
import { getUserPortfolio } from '../api/axios';
import PortfolioOverview from '../components/PortfolioPage/PortfolioOverview';
import PortfolioTable from '../components/PortfolioPage/PortfolioTable';
import { Box, Skeleton, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import CoinsTransactionsTable from '../components/PortfolioPage/CoinsTransactionsTable';

export default function PortfolioPage() {
  const { data, isLoading, isFetching } = useQuery('userCoins', getUserPortfolio);
  const [showTable, setShowTable] = useState('coinsTable');
  const [activeCoinId, setActiveCoinId] = useState<number>(0);

  return (
    <>
      <Skeleton isLoaded={!isLoading}>
        <Box as="section" position="relative">
          {isFetching ? <Spinner position="absolute" top="50%" left="50%" /> : null}
          {showTable === 'coinsTable' ? (
            <Box>
              <PortfolioOverview
                allTimeProfit={data?._allTimeProfit}
                bestPerformer={data?.bestPerformer}
                worstPerformer={data?.worstPerformer}
                portfolioWorth={data?.portfolioWorth}
                cryptoBalance={data?.cryptoBalance}
                dollerBalance={data?.dollerBalance}
              />
              <PortfolioTable
                coins={data?.coins}
                setShowTable={setShowTable}
                setActiveCoinId={setActiveCoinId}
              />
            </Box>
          ) : (
            <CoinsTransactionsTable setShowTable={setShowTable} activeCoinId={activeCoinId} />
          )}
        </Box>
      </Skeleton>
    </>
  );
}
