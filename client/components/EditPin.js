import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import FormStyle from './styles/FormStyle';
import formatMoney from '../lib/formatMoney';
import gql from 'graphql-tag';
import Router from 'next/router';

export const SINGLE_PIN_QUERY = gql`
  query SINGLE_PIN_QUERY($id: ID!) {
    pin(where: { id: $id }) {
      name
      volumnSize
      edition
      exclusive
      figpinID
      price
      image
      largeImage
    }
  }
`;

export const UPDATE_PIN_MUTATION = gql`
  mutation UpdatePin(
    $id: ID!
    $name: String
    $figpinID: Int
    $volumnSize: Int
    $edition: String
    $price: Int
    $exclusive: Boolean
    $image: String
  ) {
    updatePin(
      id: $id
      name: $name
      figpinID: $figpinID
      volumnSize: $volumnSize
      edition: $edition
      price: $price
      exclusive: $exclusive
      image: $image
    ) {
      id
    }
  }
`;

const EditPin = ({ id }) => {
  const [formState, setFormState] = useState({});
  const { loading: pinLoading, error: pinError, data } = useQuery(
    SINGLE_PIN_QUERY,
    {
      variables: { id },
    }
  );

  const [updatePin, { loading, error }] = useMutation(UPDATE_PIN_MUTATION);

  if (pinLoading) return <p>Loading...</p>;

  // const [formState, setFormState] = useState({ ...data.pin });

  function updateFormState(e) {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  }

  async function uploadFile(e) {
    console.log('uploading file...');
    console.log(e.target.files);
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'figpin-marketplace');

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dyctv2fj1/image/upload`,
      {
        method: 'post',
        body: data,
      }
    );
    const file = await res.json();
    console.log(file);
    setFormState({
      ...formState,
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  }
  console.log(data);

  return (
    <FormStyle
      onSubmit={async e => {
        e.preventDefault();
        const { data } = await updatePin({
          variables: { id, ...formState },
        });
        Router.push({
          pathname: '/pin',
          query: { id: data.updatePin.id },
        });
      }}
    >
      {error && <p>There was an error</p>}
      <h2>Edit a Pin</h2>
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="file">
          Image
          <input
            type="file"
            id="file"
            name="file"
            placeholder="Upload an image"
            onChange={uploadFile}
          />
          {formState.image && (
            <img
              width={200}
              height={300}
              src={formState.image}
              alt="Upload Preview"
            />
          )}
          {data.pin.image && !formState.image && (
            <img
              width={200}
              height={300}
              src={data.pin.image}
              alt="Upload Preview"
            />
          )}
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            defaultValue={data.pin.name}
            onChange={updateFormState}
            required
          />
        </label>
        <label htmlFor="figpinID">
          FiGPiN ID
          <input
            type="number"
            id="figpinID"
            name="figpinID"
            placeholder="FiGPiN ID"
            onChange={updateFormState}
            defaultValue={data.pin.figpinID}
            required
          />
        </label>
        <label htmlFor="volumnSize">
          Volumn Size
          <input
            type="number"
            id="volumnSize"
            name="volumnSize"
            defaultValue={data.pin.volumnSize}
            onChange={updateFormState}
            placeholder="Volumn Size"
            required
          />
        </label>
        <label htmlFor="edition">
          Edition
          <input
            type="text"
            id="edition"
            name="edition"
            defaultValue={data.pin.edition}
            onChange={updateFormState}
            placeholder="Edition"
            required
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={data.pin.price}
            onChange={updateFormState}
            placeholder="price"
            required
          />
        </label>
        <label htmlFor="exclusive">
          Exclusive
          <input
            type="checkbox"
            id="exclusive"
            name="exclusive"
            onChange={updateFormState}
            defaultChecked={data.pin.exclusive}
            // checked={data.pin.exclusive}
          />
        </label>
        <button type="submit">Updat{loading ? 'ing' : 'e'} Pin</button>
      </fieldset>
    </FormStyle>
  );
};

export default EditPin;
