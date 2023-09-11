import { Button, Flex, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useColorMode } from "@chakra-ui/react"

interface IDeleteTransactionModal {
    isOpen: boolean;
    onClose: () => void;
}
export const DeleteTransactionModal = ({ isOpen, onClose }: IDeleteTransactionModal) => {
  const { colorMode } = useColorMode();

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent width={"25.6rem"} position={"relative"}>
                <ModalHeader textAlign={"center"}>Delete Transaction</ModalHeader>
                <ModalCloseButton position={"absolute"} right={"0.8rem"} top={"1.1rem"} />
                <ModalBody>
                    <form>
                        <FormControl>
                            <FormLabel textAlign={"center"}>
                                The following <Text as={'b'}>Transaction</Text> will be deleted.
                                <Text color={"#a3b1bf"} mt={"0.7rem"}>
                                    This action cannot be undone.
                                </Text>
                            </FormLabel>
                        </FormControl>

                        <Flex flexDir={"column"} alignItems={"center"} my="1rem" gap={"0.6rem"}>
                            <Button
                                type="submit"
                                width={"17rem"}
                                fontWeight={"normal"}
                                background={colorMode=== "light" ? "#fff" : "none"}
                                color="rgb(255, 0, 0)"
                                border="1px solid rgb(255, 0, 0)"
                                _hover={{
                                    backgroundColor: "none"
                                }}
                            // onClick={deleteCoinAndData}
                            >
                                Delete Transaction
                            </Button>
                        </Flex>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
