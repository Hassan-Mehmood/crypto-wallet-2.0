import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

import Navbar from './components/Navbar/Navbar';
import { getHighlightsData } from './api/axios';
import { useQuery } from 'react-query';
import TrendingCoins from './components/highlights/TrendingCoins';
import GlobalData from './components/highlights/GlobalData';

function App() {
  const { data } = useQuery('trendingCoins', getHighlightsData);
  const trendingCoins = data && data[0];
  const globalData = data && data[1].data;

  return (
    <Box px={5} mx="auto" maxW="1402px">
      <Navbar />

      <SimpleGrid spacing={4} templateColumns="repeat(3, 1fr)">
        <Card>
          <CardHeader>
            <Heading size="md"> Trending Coins</Heading>
          </CardHeader>
          <CardBody>
            {trendingCoins?.slice(0, 3).map((coin) => (
              <TrendingCoins item={coin.item} key={coin.item.id} />
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md">Global News</Heading>
          </CardHeader>
          <CardBody>
            <GlobalData
              activeCurrencies={globalData?.active_cryptocurrencies}
              markets={globalData?.markets}
              icos={globalData?.ongoing_icos}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md">Market Dominance</Heading>
          </CardHeader>
          <CardBody></CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
}

export default App;
