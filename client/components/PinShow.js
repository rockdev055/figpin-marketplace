import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import styled from 'styled-components';
import { SINGLE_PIN_QUERY } from './EditPin';
import Item from './styles/PinStyles';

const PinShowStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const PinShow = ({ id }) => {
  const { loading, error, data } = useQuery(SINGLE_PIN_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  const { pin } = data;
  if (!data.pin) return <p>No pin found for id {id}</p>;
  return (
    <PinShowStyles>
      <Head>
        <title>FiGPiN - {pin.name}</title>
      </Head>
      <div>
        <img src={pin.largeImage} alt={pin.name} />
      </div>
      <div className="details">
        <h2>Viewing {pin.name}</h2>
        <p>Volumn Size: {pin.volumnSize} </p>
      </div>
    </PinShowStyles>
  );
};

export default PinShow;
