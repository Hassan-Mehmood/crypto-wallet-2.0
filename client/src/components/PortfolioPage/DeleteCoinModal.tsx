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
  Button,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

interface props {
  isOpen: boolean;
  onClose: () => void;
  id: number | null;
  setCoinId: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function DeleteCoinModal({ isOpen, onClose, id, setCoinId }: props) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [disableBtn, setDisableBtn] = useState(false);

  const deleteCoinAndDataMutation = useMutation(
    (coinId: number) =>
      axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/portfolio/deleteCoinAndTransactions/${coinId}`,
        {
          withCredentials: true,
        }
      ),
    {
      onMutate: () => setDisableBtn(true),
      onSettled: () => setDisableBtn(false),

      onSuccess: () => {
        queryClient.refetchQueries('userCoins');
        showToast('Success', 'Coin and data successfully deleted.', 'success');
        onClose();
        setCoinId(null);
      },
      onError: () => {
        showToast('Error', 'Failed to delete coin and data.', 'error');
        setCoinId(null);
      },
    }
  );

  const deleteCoinAndKeepDataMutation = useMutation(
    (coinId: number) =>
      axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/portfolio/deleteCoinAndKeepTransactions/${coinId}`,
        {
          withCredentials: true,
        }
      ),
    {
      onMutate: () => setDisableBtn(true),
      onSettled: () => setDisableBtn(false),

      onSuccess: () => {
        queryClient.refetchQueries('userCoins');
        showToast('Success', 'Coin successfully deleted.', 'success');
        onClose();
        setCoinId(null);
      },
      onError: () => {
        showToast('Error', 'Failed to delete coin.', 'error');
        setCoinId(null);
      },
    }
  );

  function deleteCoinAndData(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (id === null) return;

    deleteCoinAndDataMutation.mutate(id);
  }

  function deleteCoinAndKeepTransaction(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (id === null) return;

    deleteCoinAndKeepDataMutation.mutate(id);
  }

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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation: Delete Coin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl>
                <FormLabel>
                  Are you sure you want to delete the historical record of this coin from your
                  portfolio?
                  <Box>This action cannot be undone.</Box>
                </FormLabel>
              </FormControl>

              <Box mt="2rem">
                <Button
                  isLoading={disableBtn}
                  type="submit"
                  color="#fff"
                  m="0 0.5rem 0.5rem 0"
                  backgroundColor="#ff0000"
                  maxW="100%"
                  width="100%"
                  _hover={{ backgroundColor: '#dd0000' }}
                  onClick={deleteCoinAndData}
                >
                  Delete Coin & all transactions
                </Button>
                <Button
                  isLoading={disableBtn}
                  type="submit"
                  color="#fff"
                  m="0 0.5rem 0.5rem 0"
                  backgroundColor="#ff0000"
                  maxW="100%"
                  width="100%"
                  _hover={{ backgroundColor: '#dd0000' }}
                  onClick={deleteCoinAndKeepTransaction}
                >
                  Delete Coin But transactions remain
                </Button>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
