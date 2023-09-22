import { Box } from '@chakra-ui/layout';
import { useQuery } from 'react-query';
import { getCoinTransactions } from '../../api/axios';
import TransactionsOverview from './TransactionsOverview';
import TransactionsTable from './TransactionsTable';

interface props {
  setShowTable: React.Dispatch<React.SetStateAction<string>>;
  activeCoinId: number;
}

export default function CoinsTransactionsTable({ setShowTable, activeCoinId }: props) {
  const { data, isLoading, refetch } = useQuery('coinTransaction', () =>
    getCoinTransactions(activeCoinId)
  );

  return (
    <>
      <Box>
        <TransactionsOverview setShowTable={setShowTable} isLoading={isLoading} data={data} />

        <TransactionsTable
          isLoading={isLoading}
          data={data}
          setShowTable={setShowTable}
          refetch={refetch}
        />
      </Box>
    </>
  );
}
