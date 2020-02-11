import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { GET_PINS } from './Pins';

export const DELETE_PIN_MUTATION = gql`
  mutation DeletePin($id: ID!) {
    deletePin(id: $id) {
      id
    }
  }
`;

const DeletePin = ({ children, id }) => {
  function update(cache, payload) {
    const data = cache.readQuery({ query: GET_PINS });

    const newData = {
      ...data,
      getPins: data.getPins.filter(pin => pin.id !== payload.data.deletePin.id),
    };

    cache.writeQuery({ query: GET_PINS, data: newData });
  }

  const [deletePin, { loading }] = useMutation(DELETE_PIN_MUTATION, {
    update,
  });

  return (
    <button
      onClick={() => {
        deletePin({ variables: { id } });
      }}
    >
      {children}
    </button>
  );
};

export default DeletePin;
