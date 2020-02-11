import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import TitleStyle from './styles/TitleStyle';
import PriceTagStyle from './styles/PriceTagStyle';
import PinStyles from './styles/PinStyles';
import format from '../lib/formatMoney';
import DeletePin from './DeletePin';

const Pin = ({ pin }) => {
  return (
    <PinStyles>
      {pin.image && <img src={pin.image} alt={pin.title} />}
      <TitleStyle>
        <Link href={{ pathname: '/pin', query: { id: pin.id } }}>
          <a>{pin.name}</a>
        </Link>
      </TitleStyle>
      <PriceTagStyle>{format(pin.price)}</PriceTagStyle>
      <p>{pin.edition}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: 'edit-pin',
            query: { id: pin.id },
          }}
        >
          <a>Edit</a>
        </Link>

        <button>Add to Cart</button>
        <DeletePin id={pin.id}>Delete</DeletePin>
      </div>
    </PinStyles>
  );
};

Pin.propTypes = {
  pin: PropTypes.object.isRequired,
};

export default Pin;
