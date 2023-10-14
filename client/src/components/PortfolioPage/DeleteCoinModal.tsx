import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Button,
  Text,
  Flex,
  useColorMode,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import useCustomToast from '../../hooks/useCustomToast';

interface props {
  isOpen: boolean;
  onClose: () => void;
  id: number | null;
  setCoinId: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function DeleteCoinModal({ isOpen, onClose, id, setCoinId }: props) {
  const queryClient = useQueryClient();
  const { colorMode } = useColorMode();
  const showToast = useCustomToast();
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
        showToast({
          title: 'Success',
          description: 'Coin and data successfully deleted.',
          status: 'success',
        });
        onClose();
        setCoinId(null);
      },
      onError: () => {
        showToast({
          title: 'Error',
          description: 'Failed to delete coin and data.',
          status: 'error',
        });
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
        showToast({
          title: 'Success',
          description: 'Coin successfully deleted.',
          status: 'success',
        });
        onClose();
        setCoinId(null);
      },
      onError: () => {
        showToast({ title: 'Error', description: 'Failed to delete coin.', status: 'error' });
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent width={'25.6rem'} position={'relative'}>
        <ModalHeader textAlign={'center'}>Delete Coin?</ModalHeader>
        <ModalCloseButton position={'absolute'} right={'0.8rem'} top={'1.1rem'} />
        <ModalBody>
          <form>
            <FormControl>
              <FormLabel textAlign={'center'}>
                All records of this coin in your <Text as={'b'}>Portfolio</Text> will be deleted.
                <Text color={'#a3b1bf'} mt={'0.7rem'}>
                  This action cannot be undone.
                </Text>
              </FormLabel>
            </FormControl>
            <Flex flexDir={'column'} alignItems={'center'} my="1rem" gap={'0.6rem'}>
              <Button
                isDisabled={disableBtn}
                type="submit"
                width={'17rem'}
                fontWeight={'normal'}
                background={colorMode === 'light' ? '#fff' : 'none'}
                color="rgb(255, 0, 0)"
                border="1px solid rgb(255, 0, 0)"
                _hover={{
                  backgroundColor: 'none',
                }}
                onClick={deleteCoinAndData}
              >
                Delete Coin & All Transactions
              </Button>
              <Button
                isDisabled={disableBtn}
                type="submit"
                width={'17rem'}
                fontWeight={'normal'}
                background={colorMode === 'light' ? '#fff' : 'none'}
                color="rgb(255, 0, 0)"
                border="1px solid rgb(255, 0, 0)"
                onClick={deleteCoinAndKeepTransaction}
                _hover={{
                  backgroundColor: 'none',
                }}
              >
                Delete Coin, Keep Transactions
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
