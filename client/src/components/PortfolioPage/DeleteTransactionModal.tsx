import { Modal, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"

interface IDeleteTransactionModal {
    isOpen: boolean;
    onClose: () => void;
}
export const DeleteTransactionModal = ({ isOpen, onClose }: IDeleteTransactionModal) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Hey</ModalHeader>
            </ModalContent>
        </Modal>
    )
}
