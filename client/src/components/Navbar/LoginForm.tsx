import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import { LoginFormDataType } from '../../types';
import { useMutation } from 'react-query';
import axios from 'axios';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormDataType>({
    email: '',
    password: '',
  });

  const formSubmit = useMutation(async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users/login-user`,
      formData
    );
    return response.data;
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    formSubmit.mutate();
    console.log('form submit', formData);
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl mt={4}>
        <FormLabel fontWeight="semibold">Email address</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </FormControl>

      <FormControl mt={4}>
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
      </FormControl>

      <Button type="submit" mt={7} colorScheme="green" w="100%">
        Login
      </Button>
    </form>
  );
}
