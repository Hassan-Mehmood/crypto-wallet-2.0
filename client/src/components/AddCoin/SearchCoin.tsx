import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Button,
  Box,
} from '@chakra-ui/react';

export default function SearchCoin() {
  return (
    <Box border="1px solid black" p="1rem" maxW="600px" w="100%">
      <Flex justifyContent="space-between">
        <Heading as="h6" size="md" mb="2rem">
          Add Coin
        </Heading>
        <Heading as="h6" size="md" mb="2rem">
          Balance:
        </Heading>
      </Flex>
      <Flex align="center" mb="1rem">
        {/* <Image src={clickedCoin.thumb} /> */}
        <Heading as="h6" size="sm" textTransform="capitalize" ml=".5rem">
          No coin selected
        </Heading>
      </Flex>
      <form>
        <Flex gap="1rem">
          <FormControl>
            <FormLabel>Quantity</FormLabel>
            <NumberInput
              min={0}
              // value={coinQuantity}
              // onChange={(value) => hanldeQunatityInput(value)}
            >
              <NumberInputField h="35px" border="1px solid black" p=".5rem" />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <NumberInput>
              <NumberInputField h="35px" border="1px solid black" p=".5rem" />
            </NumberInput>
          </FormControl>
        </Flex>
        <Box>
          <Heading as="h6" size="sm" mt="1rem">
            Total: 0
          </Heading>
          <Box mt="1rem">
            <Button
              // onClick={addTransaction}
              type="submit"
              fontSize="sm"
              borderRadius="8px"
              color="#fff"
              background="rgb(105, 162, 53)"
              margin="0 0.5rem 0 0"
              border="1px solid rgb(105, 162, 53)"
              _hover={{
                background: 'rgb(81, 126, 39)',
              }}
            >
              Add Transaction
            </Button>
            <Button
              // onClick={cancelTransaction}
              fontSize="sm"
              border="1px solid rgb(105, 162, 53)"
              borderRadius="8px"
              background="none"
              padding={'0 16px'}
              _hover={{
                background: 'rgb(105, 162, 53)',
                color: '#fff',
                border: '1px solid rgb(105, 162, 53)',
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
