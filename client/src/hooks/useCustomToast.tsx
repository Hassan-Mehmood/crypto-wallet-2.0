import { useToast } from '@chakra-ui/react';

interface props {
  title: string;
  description: string;
  status: 'error' | 'success';
}

export default function useCustomToast() {
  const toast = useToast();

  const showToast = ({ title, description, status }: props) => {
    return toast({
      title,
      description,
      position: 'top',
      status,
      duration: 3000,
      isClosable: true,
    });
  };

  return showToast;
}
