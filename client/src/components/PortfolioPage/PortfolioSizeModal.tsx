import {
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
  Flex,
  useColorMode,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
// import { useMutation, useQueryClient } from 'react-query';
import { useMutation } from 'react-query';
// import { UserTransactionsData } from '../../types';

interface props {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function PortfolioSizeModal({ isOpen, onClose }: props) {
  const [accountBalance, setAccountBalance] = useState('0');
  const { colorMode } = useColorMode();
  const toast = useToast();
  // const queryClient = useQueryClient();

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
        // queryClient.setQueryData(['userCoins'], (oldData: UserTransactionsData) => {
        //   oldData.dollerBalance =
        //   return [...oldData];
        // });
        onClose();
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent width={'25.6rem'} py={'1rem'}>
        <ModalHeader textAlign={'center'}>Portfolio Size</ModalHeader>
        <ModalCloseButton position={'absolute'} right={'0.8rem'} top={'2rem'} />
        <ModalBody>
          <form onSubmit={(e) => handleSubmit(e)}>
            <FormControl display={'flex'} justifyContent={'center'} mt={'0.5rem'}>
              <FormLabel>Total Quatity</FormLabel>
              <NumberInput
                min={0}
                value={accountBalance}
                precision={2}
                onChange={(valueAsString) => handleFormValue(valueAsString)}
              >
                <NumberInputField
                  h="35px"
                  border={`1px solid ${colorMode === 'light' ? '#000' : '#fff'}`}
                />
              </NumberInput>
            </FormControl>

            <Flex mt="1.2rem" justify={'center'}>
              <Button
                type="submit"
                mb="0.5rem"
                color={colorMode === 'light' ? '#000' : '#fff'}
                backgroundColor={colorMode === 'light' ? '#fff' : '#2d3748'}
                maxW="100%"
                width="21rem"
                py={'1.35rem'}
                border="1px solid"
                _hover={{ backgroundColor: 'none' }}
              >
                Set portfolio size
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
