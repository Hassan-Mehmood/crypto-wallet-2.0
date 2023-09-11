import { FC } from 'react';
import { Tr, Td, Image, Text, useColorMode } from '@chakra-ui/react';
import { HomeTableCoin } from '../../../types';

type PropsType = {
  coin: HomeTableCoin;
  coinCounter: number;
};

const CoinRow: FC<PropsType> = ({ coin, coinCounter }) => {
  const { colorMode } = useColorMode();

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
      _hover={{ backgroundColor: colorMode === "light" ? '#f4f4f4' : "#212835", cursor: 'pointer' }}
    >
      <Td textAlign={"center"}>{coinCounter}</Td>
      <Td
        display={"flex"}
        justifyContent={"center"}
        alignItems="center"
        fontWeight="semibold">
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
            color="rgb(128, 138, 157)"
            fontSize={12}
          >
            {symbol}
          </Text>
        </Text>
      </Td>
      <Td textAlign={"center"}>{currentPrice}</Td>
      <Td textAlign={"center"} color={getPercentageColor(oneHourChange)}>
        {oneHourChange ? oneHourChange.toFixed(2) : ''}
      </Td>
      <Td textAlign={"center"} color={getPercentageColor(twoFourHourChange)}>
        {twoFourHourChange ? twoFourHourChange.toFixed(2) : ''}
      </Td>
      <Td textAlign={"center"} color={getPercentageColor(sevenDayChange)}>
        {sevenDayChange ? sevenDayChange.toFixed(2) : ''}
      </Td>
      <Td textAlign={"center"}>${totalVolume?.toLocaleString('en-US')}</Td>
      <Td textAlign={"center"}>${marketCap?.toLocaleString('en-US')}</Td>
    </Tr>
  );
};

export default CoinRow;
