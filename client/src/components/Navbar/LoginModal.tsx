import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import LoginForm from './LoginForm';

type props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton position={"absolute"} right={"0.8rem"} top={"1.1rem"} />
        <ModalBody pb={8}>
          <LoginForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
