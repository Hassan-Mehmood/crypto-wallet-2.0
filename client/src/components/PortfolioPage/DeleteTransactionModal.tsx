import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';

interface IDeleteTransactionModal {
  isOpen: boolean;
  transactionID: number;
  onClose: () => void;
}
export const DeleteTransactionModal = ({
  isOpen,
  onClose,
  transactionID,
}: IDeleteTransactionModal) => {
  const { colorMode } = useColorMode();
  const toast = useToast();

  const [loadingBtn, setLoadingBtn] = useState(false);

  const delTransaction = useMutation(
    async (id: number) => {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/portfolio/transactions/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    },
    {
      onMutate: () => setLoadingBtn(true),
      onSettled: () => setLoadingBtn(false),

      onSuccess: () => {
        showToast('Success', 'Coin bought successfully', 'success');
      },
      onError: () => {
        showToast('Error', 'Something went wrong', 'error');
      },
    }
  );

  function deleteTransaction(id: number) {
    delTransaction.mutate(id);
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent width={'25.6rem'} position={'relative'}>
        <ModalHeader textAlign={'center'}>Delete Transaction</ModalHeader>
        <ModalCloseButton position={'absolute'} right={'0.8rem'} top={'1.1rem'} />
        <ModalBody>
          <form>
            <FormControl>
              <FormLabel textAlign={'center'}>
                The following <Text as={'b'}>Transaction</Text> will be deleted.
                <Text color={'#a3b1bf'} mt={'0.7rem'}>
                  This action cannot be undone.
                </Text>
              </FormLabel>
            </FormControl>

            <Flex flexDir={'column'} alignItems={'center'} my="1rem" gap={'0.6rem'}>
              <Button
                isLoading={loadingBtn}
                type="submit"
                width={'17rem'}
                fontWeight={'normal'}
                background={colorMode === 'light' ? '#fff' : 'none'}
                color="rgb(255, 0, 0)"
                border="1px solid rgb(255, 0, 0)"
                _hover={{
                  backgroundColor: 'none',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  deleteTransaction(transactionID);
                }}
              >
                Delete Transaction
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
