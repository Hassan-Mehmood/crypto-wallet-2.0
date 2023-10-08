import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import EditTransactionBuyForm from './EditTransactionBuyForm';
import EditTransactionSellForm from './EditTransactionSellForm';

interface IEditTransactionModal {
  isOpen: boolean;
  onClose: () => void;
  transactionID: number;
  transactionType: string;
}
export const EditTransactionModal = ({
  isOpen,
  onClose,
  transactionID,
  transactionType,
}: IEditTransactionModal) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent width={'25.6rem'} position={'relative'}>
        <ModalHeader textAlign={'center'}>Edit Transaction</ModalHeader>
        <ModalCloseButton position={'absolute'} right={'0.8rem'} top={'1.1rem'} />
        <ModalBody py="1.5rem">
          {transactionType === 'BUY' ? (
            <EditTransactionBuyForm
              isOpen={isOpen}
              transactionID={transactionID}
              onClose={onClose}
            />
          ) : (
            <EditTransactionSellForm
              isOpen={isOpen}
              transactionID={transactionID}
              onClose={onClose}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
