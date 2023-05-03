import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { SearchCoin } from '../../types';
import { useDispatch } from 'react-redux';
import { addCoin } from '../../slices/coinSlice';

interface Props {
  Coin: SearchCoin;
}

const SearchedCoin = ({ Coin }: Props) => {
  const dispatch = useDispatch();

  return (
    <Box pt="1rem" px="1rem">
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <Image src={Coin.thumb} maxW="1.5rem" />
          <Text fontWeight="semibold" ml="1rem">
            {Coin.name}
            <Text as="span" color="blackAlpha.600" ml="0.5rem">
              ({Coin.symbol})
            </Text>
          </Text>
        </Flex>
        <Button
          onClick={(e) => dispatch(addCoin(Coin))}
          fontSize="sm"
          borderRadius="8px"
          color="#fff"
          background="rgb(105, 162, 53)"
          padding={'0 16px'}
          border="1px solid rgb(105, 162, 53)"
          _hover={{
            background: 'rgb(81, 126, 39)',
          }}
        >
          Add
        </Button>
      </Flex>
    </Box>
  );
};

export default SearchedCoin;
