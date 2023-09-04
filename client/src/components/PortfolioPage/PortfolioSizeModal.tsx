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
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useMutation } from 'react-query';

interface props {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function PortfolioSizeModal({ isOpen, onClose }: props) {
  const [accountBalance, setAccountBalance] = useState('0');
  const toast = useToast();

  const setPortfolioSize = useMutation(
    async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/portfolio/balance`,
        { accountBalance },
        { withCredentials: true }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        showToast('Success', 'Portfolio size set successfully', 'success');
      },
      onError: () => {
        showToast('Error', 'Something went wrong', 'error');
      },
    }
  );

  function showToast(title: string, description: string, status: 'error' | 'success') {
    return toast({
      title,
      description,
      position: 'top',
      status,
      duration: 3000,
      isClosable: true,
    });
  }

  const handleFormValue = (value: string) => {
    const valueNumber = parseFloat(value);
    if (isNaN(valueNumber)) {
      setAccountBalance('0');
      return;
    }
    setAccountBalance(value);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPortfolioSize.mutate();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Portfolio Size</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={(e) => handleSubmit(e)}>
              <FormControl>
                <FormLabel>Enter your portfolio size</FormLabel>
                <NumberInput
                  min={0}
                  value={accountBalance}
                  precision={2}
                  onChange={(valueAsString) => handleFormValue(valueAsString)}
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
