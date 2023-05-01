import { FC } from 'react';
import { Tr, Td, Flex, Image, Text } from '@chakra-ui/react';
import { HomeTableCoin } from '../../types';

type PropsType = {
  coin: HomeTableCoin;
  coinCounter: number;
};

const CoinRow: FC<PropsType> = ({ coin, coinCounter }) => {
  const {
    name,
    symbol,
    current_price: currentPrice,
    price_change_percentage_1h_in_currency: oneHourChange,
    price_change_percentage_24h_in_currency: twoFourHourChange,
    price_change_percentage_7d_in_currency: sevenDayChange,
    total_volume: totalVolume,
    market_cap: marketCap,
    image,
  } = coin;

  const getPercentageColor = (percentage: number) => {
    if (percentage > 0) {
      return 'green';
    } else if (percentage < 0) {
      return 'red';
    } else {
      return 'black';
    }
  };

  return (
    <Tr
      cursor="pointer"
      _hover={{
        backgroundColor: '#f5f5f5',
      }}
    >
      <Td>{coinCounter}</Td>
      <Td color="#000" fontWeight="semibold">
        <Flex alignItems="center">
          <Image
            src={image}
            maxW="1.25rem"
            mr="0.5rem"
            display="inline-block"
            alignItems="center"
          />
          <Text>
            {name}
            <Text
              as="span"
              ml="1rem"
              textTransform="uppercase"
              color="blackAlpha.600"
              fontSize={12}
            >
              {symbol}
            </Text>
          </Text>
        </Flex>
      </Td>
      <Td>{currentPrice}</Td>
      <Td color={getPercentageColor(oneHourChange)}>
        {oneHourChange ? oneHourChange.toFixed(2) : ''}
      </Td>
      <Td color={getPercentageColor(twoFourHourChange)}>
        {twoFourHourChange ? twoFourHourChange.toFixed(2) : ''}
      </Td>
      <Td color={getPercentageColor(sevenDayChange)}>
        {sevenDayChange ? sevenDayChange.toFixed(2) : ''}
      </Td>
      <Td>${totalVolume?.toLocaleString('en-US')}</Td>
      <Td>${marketCap?.toLocaleString('en-US')}</Td>
    </Tr>
  );
};

export default CoinRow;
