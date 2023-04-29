import React from 'react';
import { useQuery } from 'react-query';
import { coinsList } from '../../api/axios';

export default function Table() {
  const { data } = useQuery('coinsList', () => coinsList());

  console.log(data);

  return <div>Table</div>;
}
