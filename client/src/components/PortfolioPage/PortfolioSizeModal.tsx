import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';

export default function PortfolioSizeModal({ isOpen, onOpen, onClose }: any) {
  const [accountBalance, setAccountBalance] = useState(0);

  function handleFormValue(value: number) {
    setAccountBalance(value);
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={(e) => console.log(e)}>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <NumberInput
                  min={0}
                  value={accountBalance}
                  precision={2}
                  onChange={(valueAsString, valueAsNumber) => handleFormValue(valueAsNumber)}
                >
                  <NumberInputField h="35px" border="1px solid black" p=".5rem" />
                </NumberInput>
              </FormControl>

              <Box mt="2rem">
                <Button
                  type="submit"
                  mb="0.5rem"
                  backgroundColor="#fff"
                  maxW="100%"
                  width="100%"
                  border="1px solid"
                  _hover={{ backgroundColor: 'rgba(216, 216, 216, 0.541)' }}
                >
                  Set portfolio size
                </Button>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
