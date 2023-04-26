import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

import Navbar from './components/Navbar/Navbar';
import { getTrendingCoins } from './api/axios';
import { useQuery } from 'react-query';
import TrendingCoins from './components/Navbar/highlights/TrendingCoins';

function App() {
  const { data: trendingCoins } = useQuery('trendingCoins', getTrendingCoins);

  console.log(trendingCoins);

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
            <Heading size="md"> Customer dashboard</Heading>
          </CardHeader>
          <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md"> Customer dashboard</Heading>
          </CardHeader>
          <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </Box>
  );
}

export default App;
