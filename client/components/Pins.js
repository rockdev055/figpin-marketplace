import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import PinList from './PinList';

const GET_PINS = gql`
  {
    getPins {
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

const Pins = () => {
  const { loading, error, data } = useQuery(GET_PINS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Center>
      <PinList pins={data.getPins} />
    </Center>
  );
};

export default Pins;
