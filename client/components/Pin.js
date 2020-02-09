import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import TitleStyle from './styles/TitleStyle';
import PriceTagStyle from './styles/PriceTagStyle';
import PinStyles from './styles/PinStyles';
import format from '../lib/formatMoney';

const Pin = ({ pin }) => {
  return (
    <PinStyles>
      {pin.image && <img src={pin.image} alt={pin.title} />}
      <TitleStyle>
        <Link href={{ pathname: '/item', query: { id: pin.id } }}>
          <a>{pin.name}</a>
        </Link>
      </TitleStyle>
      <PriceTagStyle>{format(pin.price)}</PriceTagStyle>
      <p>{pin.edition}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: { id: pin.id },
          }}
        >
          <a>Edit</a>
        </Link>

        <button>Add to Card</button>
        <button>Delete</button>
      </div>
    </PinStyles>
  );
};

Pin.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Pin;
