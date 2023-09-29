import { Flex, Button, Text, useColorMode, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import AddCoinModal from './AddCoinModal';

export default function ManagePorftolio({ onOpen }: { onOpen: () => void }) {
  const { colorMode } = useColorMode();
  const { isOpen: isAddCoinOpen, onOpen: onAddCoinOpen, onClose: onAddCoinClose } = useDisclosure();

  return (
    <>
      <AddCoinModal isOpen={isAddCoinOpen} onClose={onAddCoinClose} />

      <Flex
        flexDir={{ md: 'column' }}
        justifyContent={'center'}
        alignItems={'center'}
        gap={{ md: 2 }}
      >
        <Text
          color={'#a3b1bf'}
          align={'center'}
          fontSize={'0.8rem'}
          fontWeight={'semibold'}
          display={{ base: 'none', md: 'block' }}
          width={'9.5rem'}
        >
          Manage Or Add Coins To Your Portfolio.
        </Text>
        <Flex
          flexDir={{ base: 'row', md: 'row' }}
          // width={['20rem', '25rem', '14.5rem']}
          justifyContent={'space-between'}
          mt="1rem"
        >
          <Button
            onClick={onOpen}
            // width={['9.5rem', '12rem', '7rem']}
            fontSize={{ base: '1rem', md: '0.9rem' }}
            border={`1px solid ${colorMode === 'light' ? '#8bc53f' : '#0facf0'}`}
            borderRadius="4px"
            color={colorMode === 'light' ? '#fff' : '#1a202c'}
            background={colorMode === 'light' ? '#8bc53f' : '#0facf0'}
            py={'1.3rem'}
            mr="0.5rem"
            _hover={{
              background: 'none',
              color: colorMode === 'light' ? '#8bc53f' : '#0facf0',
            }}
          >
            Edit Dollar Balance
          </Button>
          <Button
            onClick={() => onAddCoinOpen()}
            fontSize={{ base: '1rem', md: '0.9rem' }}
            // width={['9.5rem', '12rem', '7rem']}
            border={`1px solid ${colorMode === 'light' ? '#8bc53f' : '#0facf0'}`}
            borderRadius="4px"
            color={colorMode === 'light' ? '#fff' : '#1a202c'}
            background={colorMode === 'light' ? '#8bc53f' : '#0facf0'}
            py={'1.3rem'}
            _hover={{
              background: 'none',
              color: colorMode === 'light' ? '#8bc53f' : '#0facf0',
            }}
          >
            Add Coins
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
