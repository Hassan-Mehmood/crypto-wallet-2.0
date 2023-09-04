import {
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  CardBody,
  GridItem,
  Skeleton,
} from '@chakra-ui/react';
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
    <SimpleGrid
      spacing={4}
      templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
    >
      <Card>
        <Skeleton isLoaded={!isLoading}>
          <CardHeader>
            <Heading size="md">Trending Coins</Heading>
          </CardHeader>
          <CardBody>
            {trendingCoins?.slice(0, 3).map((coin) => (
              <TrendingCoins coin={coin} key={coin.item.id} />
            ))}
          </CardBody>
        </Skeleton>
      </Card>
      <Card>
        <Skeleton isLoaded={!isLoading}>
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
        </Skeleton>
      </Card>
      <GridItem colSpan={[2, 2, 1]} display={['flex', 'flex', 'block']} justifyContent={'center'}>
        <Skeleton isLoaded={!isLoading}>
          <Card width={['48.8vw', '45.1vw', 'full']}>
            <CardHeader>
              <Heading size="md">Market Dominance</Heading>
            </CardHeader>
            <CardBody>
              <MarketDominance
                dominance={globalData?.market_cap_percentage}
                isLoading={isLoading}
              />
            </CardBody>
          </Card>
        </Skeleton>
      </GridItem>
    </SimpleGrid>
  );
}
