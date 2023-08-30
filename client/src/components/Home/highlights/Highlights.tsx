import { SimpleGrid, Card, CardHeader, Heading, CardBody, Spinner, GridItem } from '@chakra-ui/react';
import GlobalData from './GlobalData';
import MarketDominance from './MarketDominance';
import TrendingCoins from './TrendingCoins';
import { useQuery } from 'react-query';
import { getHighlightsData } from '../../../api/axios';

export default function Highlights() {
  const { data, isLoading } = useQuery('trendingCoins', getHighlightsData);
  const trendingCoins = data && data[0];
  const globalData = data && data[1].data;

  return (
    <SimpleGrid spacing={4} templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}>
      <Card>
        <CardHeader>
          <Heading size="md">Trending Coins</Heading>
        </CardHeader>
        <CardBody>
          {isLoading === true ? (
            <Spinner position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" />
          ) : (
            trendingCoins
              ?.slice(0, 3)
              .map((coin) => <TrendingCoins coin={coin} key={coin.item.id} />)
          )}
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
            isLoading={isLoading}
          />
        </CardBody>
      </Card>
      <GridItem colSpan={[2, 2, 1]} display={["flex", "flex", "block"]} justifyContent={"center"}>
        <Card width={["43.2vw", "43.2vw", "full"]}>
          <CardHeader>
            <Heading size="md">Market Dominance</Heading>
          </CardHeader>
          <CardBody>
            <MarketDominance dominance={globalData?.market_cap_percentage} isLoading={isLoading} />
          </CardBody>
        </Card>
      </GridItem>
    </SimpleGrid>
  );
}
