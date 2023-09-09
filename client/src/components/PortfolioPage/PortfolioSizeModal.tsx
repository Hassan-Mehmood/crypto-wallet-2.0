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
  Flex,
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

  // <Modal isOpen={isOpen} onClose={onClose}>
  //           <ModalOverlay />
  //           <ModalContent width={"25.6rem"} position={"relative"} mt={"12rem"}>
  //               <ModalHeader textAlign={"center"}>Edit Transaction</ModalHeader>
  //               <ModalCloseButton position={"absolute"} right={"0.8rem"} top={"1.1rem"} />
  //               <form>
  //                   <ModalBody display={"flex"} flexDir={"column"} gap={1.5}>
  //                       <FormControl>
  //                           <FormLabel textAlign={"center"}>
  //                               Do you want to edit the following <Text as={'b'}>Transaction</Text>?
  //                           </FormLabel>
  //                       </FormControl>
  //                       <Flex flexDir={"column"} alignItems={"center"} my="1rem" gap={"0.6rem"}>
  //                           <Button
  //                               type="submit"
  //                               width={"17rem"}
  //                               fontWeight={"normal"}
  //                               background="#fff"
  //                               color={"#a3b1bf"}
  //                               border="1px solid #a3b1bf"
  //                               _hover={{
  //                                   backgroundColor: "none"
  //                               }}
  //                           >
  //                               Edit Transaction
  //                           </Button>
  //                       </Flex>
  //                   </ModalBody>
  //               </form>
  //           </ModalContent>
  //       </Modal>
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent py={"1rem"}>
          <ModalHeader textAlign={"center"}>Portfolio Size</ModalHeader>
          <ModalCloseButton position={"absolute"} right={"0.8rem"} top={"2rem"} />
          <ModalBody>
            <form onSubmit={(e) => handleSubmit(e)}>
              <FormControl display={"flex"} justifyContent={"center"} mt={"0.5rem"}>
                <FormLabel>Total Quatity</FormLabel>
                <NumberInput
                  min={0}
                  value={accountBalance}
                  precision={2}
                  onChange={(valueAsString) => handleFormValue(valueAsString)}
                >
                  <NumberInputField h="35px" border="1px solid black" />
                </NumberInput>
              </FormControl>

              <Flex mt="1.2rem" justify={"center"}>
                <Button
                  type="submit"
                  mb="0.5rem"
                  backgroundColor="#fff"
                  maxW="100%"
                  width="21rem"
                  py={"1.35rem"}
                  border="1px solid"
                  _hover={{ backgroundColor: 'rgba(216, 216, 216, 0.541)' }}
                >
                  Set portfolio size
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
