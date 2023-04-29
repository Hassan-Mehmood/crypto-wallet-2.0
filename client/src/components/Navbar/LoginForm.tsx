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

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form>
      <FormControl mt={4}>
        <FormLabel fontWeight="semibold">Email address</FormLabel>
        <Input type="email" placeholder="Enter your email address" />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel fontWeight="semibold">Password</FormLabel>
        <InputGroup>
          <Input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" />
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
