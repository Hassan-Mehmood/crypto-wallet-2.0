import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormErrorMessage,
  useToast,
  useColorMode,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import { useMutation } from 'react-query';
import { FormErrorsType, ServerSignupResponseError, SignUpFormDataType } from '../../types';

export default function SignupForm({ onClose }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrorsType>({});
  const { colorMode } = useColorMode();

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
      <Flex flexDir={"column"} gap={3}>
        <FormControl isInvalid={!!formErrors.name}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <FormErrorMessage color={"rgb(255, 0, 0)"}>{formErrors.name}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!formErrors.email}>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <FormErrorMessage color={"rgb(255, 0, 0)"}>{formErrors.email}</FormErrorMessage>
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
          <FormErrorMessage color={"rgb(255, 0, 0)"}>{formErrors.password}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!formErrors.confirmPass}>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={formData.confirmPass}
              onChange={(e) => setFormData({ ...formData, confirmPass: e.target.value })}
            />
            <InputRightElement mr={3}>
              <Button h="1.75rem" size="sm" onClick={togglePasswordVisibility}>
                {showPassword ? <Eye /> : <EyeOff />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage color={"rgb(255, 0, 0)"}>{formErrors.confirmPass}</FormErrorMessage>
        </FormControl>
      </Flex>

      <Button
        type="submit" mt={7}
        borderRadius="8px"
        color={colorMode === "light" ? "#fff" : "#1a202c"}
        background={colorMode === "light" ? "#8bc53f" : "#0facf0"}
        border={`1px solid ${colorMode === "light" ? "#8bc53f" : "#0facf0"}`}
        px={'0.7rem'}
        py={"1.3rem"}
        _hover={{
          background: 'none',
          color: colorMode === "light" ? "#8bc53f" : "#0facf0",
        }} w="100%">
        Sign up
      </Button>
    </form>
  );
}
