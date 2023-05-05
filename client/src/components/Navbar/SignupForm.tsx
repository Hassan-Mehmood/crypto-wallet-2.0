import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import { useMutation } from 'react-query';
import { FormErrorsType, ServerSignupResponseError, SignUpFormDataType } from '../../types';

export default function SignupForm({ onClose }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrorsType>({});

  const toast = useToast();
  function signupConfirmationToast() {
    return toast({
      title: 'Account registered.',
      description: 'You can login to your account',
      position: 'top',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }

  const [formData, setFormData] = useState<SignUpFormDataType>({
    name: '',
    email: '',
    password: '',
    confirmPass: '',
  });

  const submitForm = useMutation(
    async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/register-user`,
        formData
      );
      return response.data;
    },
    {
      onSuccess: () => {
        onClose();
        signupConfirmationToast();
      },
      onError: (error: ServerSignupResponseError) => {
        const { errors } = error.response.data;
        const newErrors: FormErrorsType = {};

        errors.forEach((err: any) => {
          newErrors[err.path] = err.msg;
        });

        setFormErrors(newErrors);
      },
    }
  );

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm.mutate();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl isInvalid={!!formErrors.name} mt={4}>
        <FormLabel fontWeight="semibold">Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <FormErrorMessage>{formErrors.name}</FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={!!formErrors.email}>
        <FormLabel fontWeight="semibold">Email address</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <FormErrorMessage>{formErrors.email}</FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={!!formErrors.password}>
        <FormLabel fontWeight="semibold">Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <InputRightElement mr={1}>
            <Button h="1.75rem" size="sm" onClick={togglePasswordVisibility}>
              {showPassword ? <Eye /> : <EyeOff />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{formErrors.password}</FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={!!formErrors.confirmPass}>
        <FormLabel fontWeight="semibold">Confirm password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={formData.confirmPass}
            onChange={(e) => setFormData({ ...formData, confirmPass: e.target.value })}
          />
          <InputRightElement mr={1}>
            <Button h="1.75rem" size="sm" onClick={togglePasswordVisibility}>
              {showPassword ? <Eye /> : <EyeOff />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{formErrors.confirmPass}</FormErrorMessage>
      </FormControl>

      <Button type="submit" mt={7} colorScheme="green" w="100%">
        Sign up
      </Button>
    </form>
  );
}
