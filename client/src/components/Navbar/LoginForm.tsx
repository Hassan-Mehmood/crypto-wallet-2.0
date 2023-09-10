import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormErrorMessage,
  useToast,
  Flex,
  useColorMode,
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
  const [formErrors, setFormErrors] = useState<FormErrorsType>({});
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const [formData, setFormData] = useState<LoginFormDataType>({
    email: '',
    password: '',
  });

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
        formData,
        { withCredentials: true }
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
      <Flex flexDir={"column"} gap={3}>
        <FormControl isInvalid={!!formErrors.email}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <FormErrorMessage>{formErrors.email}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!formErrors.password}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <InputRightElement mr={3}>
              <Button h="1.75rem" size="sm" onClick={togglePasswordVisibility}>
                {showPassword ? <Eye /> : <EyeOff />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{formErrors.password}</FormErrorMessage>
        </FormControl>
      </Flex>

      <Button type="submit" mt={7}
        borderRadius="8px"
        color="#fff"
        background={`${colorMode === "light" ? "#8bc53f" : "#0facf0"}`}
        border={`1px solid ${colorMode === "light" ? "#8bc53f" : "#0facf0"}`}
        px={'0.7rem'}
        py={"1.3rem"}
        _hover={{
          background: 'none',
          color: `${colorMode === "light" ? "#8bc53f" : "#0facf0"}`,
        }} w="100%">
        Login
      </Button>
    </form>
  );
}
