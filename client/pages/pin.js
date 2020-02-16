import PinShow from '../components/PinShow';

const Pin = props => {
  return (
    <div>
      <PinShow id={props.query.id} />
    </div>
  );
};

export default Pin;
