import { Button, Flex, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useColorMode } from "@chakra-ui/react"

interface IEditTransactionModal {
    isOpen: boolean;
    onClose: () => void;
}
export const EditTransactionModal = ({ isOpen, onClose }: IEditTransactionModal) => {
  const { colorMode } = useColorMode();

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered >
            <ModalOverlay />
            <ModalContent width={"25.6rem"} position={"relative"}>
                <ModalHeader textAlign={"center"}>Edit Transaction</ModalHeader>
                <ModalCloseButton position={"absolute"} right={"0.8rem"} top={"1.1rem"} />
                <form>
                    <ModalBody display={"flex"} flexDir={"column"} gap={1.5}>
                        <FormControl>
                            <FormLabel textAlign={"center"}>
                                Do you want to edit the following <Text as={'b'}>Transaction</Text>?
                            </FormLabel>
                        </FormControl>
                        <Flex flexDir={"column"} alignItems={"center"} my="1rem" gap={"0.6rem"}>
                            <Button
                                type="submit"
                                width={"17rem"}
                                fontWeight={"normal"}
                                background={colorMode=== "light" ? "#fff" : "none"}
                                color={"#a3b1bf"}
                                border="1px solid #a3b1bf"
                                _hover={{
                                    backgroundColor: "none"
                                }}
                            >
                                Edit Transaction
                            </Button>
                        </Flex>
                    </ModalBody>
                </form>
            </ModalContent>
        </Modal>
    )
}