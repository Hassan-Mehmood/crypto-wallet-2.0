import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Button,
  useColorMode,
  Input,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import useCustomToast from '../../hooks/useCustomToast';

interface props {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function PortfolioSizeModal({ isOpen, onClose }: props) {
  const [accountBalance, setAccountBalance] = useState('0');
  const { colorMode } = useColorMode();
  const showToast = useCustomToast();
  const queryClient = useQueryClient();

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
        showToast({
          title: 'Success',
          description: 'Portfolio size set successfully',
          status: 'success',
        });
        queryClient.invalidateQueries(['userCoins']);
        onClose();
      },
      onError: () => {
        showToast({ title: 'Error', description: 'Something went wrong', status: 'error' });
      },
    }
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const balance = parseFloat(accountBalance);

    if (!balance) {
      showToast({
        title: 'Error',
        description: 'Balance must be a number',
        status: 'error',
      });
      return;
    }

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
            <FormControl mt={'0.5rem'}>
              <FormControl mt={'1rem'}>
                <Input value={accountBalance} onChange={(e) => setAccountBalance(e.target.value)} />
              </FormControl>
            </FormControl>

            <Button
              type="submit"
              m="1.5rem auto 0"
              color={colorMode === 'light' ? '#000' : '#fff'}
              backgroundColor={colorMode === 'light' ? '#fff' : '#2d3748'}
              width="100%"
              py={'1.35rem'}
              border="1px solid"
              _hover={{ backgroundColor: 'none' }}
            >
              Set portfolio size
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
