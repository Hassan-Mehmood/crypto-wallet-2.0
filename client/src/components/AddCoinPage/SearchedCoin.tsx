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
    <Box py="0.5rem">
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
          borderRadius="0.3rem"
          color="#fff"
          background="#8bc53f"
          px={"0.8rem"}
          border="1.5px solid #8bc53f"
          _hover={{
            background: '#fff',
            color: "#8bc53f"
          }}
        >
          Add
        </Button>
      </Flex>
    </Box>
  );
};

export default SearchedCoin;
