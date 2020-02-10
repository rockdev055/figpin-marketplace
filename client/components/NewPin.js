import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import FormStyle from './styles/FormStyle';
import formatMoney from '../lib/formatMoney';
import gql from 'graphql-tag';
import Router from 'next/router';

export const CREATE_PIN_MUTATION = gql`
  mutation CreatePin(
    $name: String!
    $figpinID: Int!
    $volumnSize: Int!
    $edition: String!
    $price: Int!
    $exclusive: Boolean
    $image: String
    $largeImage: String
  ) {
    createPin(
      name: $name
      figpinID: $figpinID
      volumnSize: $volumnSize
      edition: $edition
      price: $price
      exclusive: $exclusive
      image: $image
      largeImage: $largeImage
    ) {
      id
      name
    }
  }
`;

const NewPin = () => {
  const [formState, setFormState] = useState({
    name: '',
    figpinID: '',
    volumnSize: '',
    edition: '',
    price: '',
    exclusive: false,
    image: '',
    largeImage: '',
  });
  const [createPin, { loading, error }] = useMutation(CREATE_PIN_MUTATION);

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
  return (
    <FormStyle
      onSubmit={async e => {
        e.preventDefault();
        const { data } = await createPin({ variables: { ...formState } });
        Router.push({
          pathname: '/pin',
          query: { id: data.createPin.id },
        });
      }}
    >
      {error && <p>There was an error</p>}
      <h2>Sell a Pin</h2>
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="name">
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
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formState.name}
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
            value={formState.figpinID}
            required
          />
        </label>
        <label htmlFor="volumnSize">
          Volumn Size
          <input
            type="number"
            id="volumnSize"
            name="volumnSize"
            value={formState.volumnSize}
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
            value={formState.edition}
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
            value={formState.price}
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
            checked={formState.exclusive}
          />
        </label>
        <button type="submit">Create Pin</button>
      </fieldset>
    </FormStyle>
  );
};

export default NewPin;

// exclusive: true,
//     largeImage: "dsafdfds",
//     image: "dsfsdf",
//     volumnSize: 200,
//     edition: "1st"
//     price:30000
