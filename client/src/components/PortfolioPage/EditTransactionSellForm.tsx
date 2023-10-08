import { FormControl, FormLabel, Input, Flex, Button, useColorMode, Text } from '@chakra-ui/react';
import React from 'react';

interface props {
  pricePerCoin: string;
  setPricePerCoin: React.Dispatch<React.SetStateAction<string>>;
  coinQuantity: string;
  setCoinQuantity: React.Dispatch<React.SetStateAction<string>>;
  setTransactionDate: React.Dispatch<React.SetStateAction<string>>;
  coinData: any;
  coinHoldingQuantity: number;
}

export default function EditTransactionSellForm({
  pricePerCoin,
  setPricePerCoin,
  coinQuantity,
  setCoinQuantity,
  setTransactionDate,
  coinData,
  coinHoldingQuantity,
}: props) {
  const { colorMode } = useColorMode();

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('submitted');
  }

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <FormControl mt={'1rem'}>
        <FormLabel>Price per coin</FormLabel>
        <Input value={pricePerCoin} onChange={(e) => setPricePerCoin(e.target.value)} />
      </FormControl>
      <FormControl mt={'1.5rem'}>
        <FormLabel>Quantity</FormLabel>
        <Input value={coinQuantity} onChange={(e) => setCoinQuantity(e.target.value)} />
      </FormControl>
      <FormControl mt={'1.5rem'}>
        <Flex justify="space-between" alignItems="center">
          <FormLabel display="inline-block">Total Recieved (USD)</FormLabel>
          <Text as="span" display="inline-block" mb="8px">
            Balance: {coinHoldingQuantity || '0'} {coinData.symbol}
          </Text>
        </Flex>
        <Input value={parseFloat(pricePerCoin) * parseFloat(coinQuantity) || '0'} readOnly />
      </FormControl>
      <FormControl mt={'1.5rem'}>
        <FormLabel>Date</FormLabel>
        <Input
          placeholder="Select Date and Time"
          type="date"
          onChange={(e) => setTransactionDate(e.target.value)}
        />
      </FormControl>

      <Button
        type="submit"
        // isLoading={loadingBtn}
        fontSize="md"
        borderRadius="0.3rem"
        color={colorMode === 'light' ? '#8bc53f' : '#0facf0'}
        backgroundColor={colorMode === 'light' ? '#fff' : '#2d3748'}
        border={`1px solid ${colorMode === 'light' ? '#8bc53f' : '#0facf0'}`}
        margin="1rem 0.5rem 0 0"
        padding="0.5rem 1.5rem"
        width="100%"
        _hover={{
          background: 'none',
        }}
      >
        Submit
      </Button>
    </form>
  );
}
