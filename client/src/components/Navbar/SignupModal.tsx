import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import SignupForm from './SignupForm';

type props = {
  isOpen: boolean;
  onClose: () => void;
};

const SignupModal = ({ isOpen, onClose }: props) => {
  return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign up</ModalHeader>
          <ModalCloseButton position={"absolute"} right={"0.8rem"} top={"1.1rem"} />
          <ModalBody pb={8}>
            <SignupForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
  );
};

export default SignupModal;
