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

  const deleteCoinMutation = useMutation(
    (coinId: number) =>
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/portfolio/deleteCoinAndData/${coinId}`, {
        withCredentials: true,
      }),
    {
      onSuccess: () => {
        queryClient.refetchQueries('userCoins');
      },
    }
  );

  function deleteCoinAndData(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (id === null) return;
    deleteCoinMutation.mutate(id);
    onClose();
    setCoinId(null);
    showToast('Success', 'Coin and data successfully deleted.', 'success');
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
                  type="submit"
                  color="#fff"
                  m="0 0.5rem 0.5rem 0"
                  backgroundColor="#ff0000"
                  maxW="100%"
                  width="100%"
                  _hover={{ backgroundColor: '#dd0000' }}
                  onClick={deleteCoinAndData}
                >
                  Delete Coin & Historical Data
                </Button>
                <Button
                  type="submit"
                  color="#fff"
                  m="0 0.5rem 0.5rem 0"
                  backgroundColor="#ff0000"
                  maxW="100%"
                  width="100%"
                  _hover={{ backgroundColor: '#dd0000' }}
                >
                  Delete Coin But Keep Data
                </Button>
                <Button
                  type="submit"
                  mb="0.5rem"
                  backgroundColor="#fff"
                  maxW="100%"
                  width="100%"
                  border="1px solid"
                  _hover={{ backgroundColor: 'rgba(216, 216, 216, 0.541)' }}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
