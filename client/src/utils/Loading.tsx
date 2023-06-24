import { Box, Flex, Text } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      width="100%"
      height="100vh"
      backgroundColor="rgba(0,0,0,0.5)"
    >
      <Flex justify="center" align="center" height="100%">
        <Text>Loading... </Text>
      </Flex>
    </Box>
  );
}
