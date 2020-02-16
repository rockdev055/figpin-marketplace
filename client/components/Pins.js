import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import PinList from './PinList';
import Pagination from './Pagination';
import { perPage } from '../config';

export const GET_PINS = gql`
  query GET_PINS($skip: Int = 0, $first: Int = ${perPage}){
    getPins(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      name
      price
      edition
      volumnSize
      image
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const Pins = ({ page }) => {
  const { loading, error, data } = useQuery(GET_PINS, {
    variables: { skip: page * perPage - perPage },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return (
    <Center>
      <Pagination page={page} />
      <PinList pins={data.getPins} />
      <Pagination page={page} />
    </Center>
  );
};

export default Pins;
