import { Box } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

export default function PortfolioPage() {
  const { data } = useQuery('transactions', () => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/transaction/all`, {
      withCredentials: true,
    });
  });

  return <Box as="section"></Box>;
}
