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
import { useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import { FormErrorsType, LoginFormDataType, ServerSignupResponseError } from '../../types';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/userSlice';

export default function LoginForm({ onClose }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormDataType>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrorsType>({});
  const dispatch = useDispatch();

  const toast = useToast();
  function loginConfirmationToast() {
    return toast({
      title: 'Login successful',
      position: 'top',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }

  const formSubmit = useMutation(
    async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/login-user`,
        formData
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        dispatch(login(data));
        loginConfirmationToast();
        onClose();
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    formSubmit.mutate();
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <form onSubmit={handleSubmit}>
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

      <Button type="submit" mt={7} colorScheme="green" w="100%">
        Login
      </Button>
    </form>
  );
}
