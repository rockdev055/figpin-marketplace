import React from 'react';
import styled from 'styled-components';
import Pin from './Pin';

const PinListStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 45px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

const PinList = ({ pins }) => {
  return (
    <>
      <p>Pins</p>
      <PinListStyle>
        {pins.map(pin => (
          <Pin key={pin.id} pin={pin} />
        ))}
      </PinListStyle>
    </>
  );
};

export default PinList;
