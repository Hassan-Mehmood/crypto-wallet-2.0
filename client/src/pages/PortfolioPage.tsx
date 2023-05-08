import { Box } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function PortfolioPage() {
  const currentUser = useSelector((state: RootState) => state.userReducer);

  const { data } = useQuery('transactions', () => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/transaction/all/${currentUser.id}`, {
      withCredentials: true,
    });
  });

  console.log(data);

  return <Box as="section"></Box>;
}
