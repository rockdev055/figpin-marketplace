import Pins from '../components/Pins';

const HomePage = props => {
  return (
    <div>
      <Pins page={+props.query.page || 1} />
    </div>
  );
};

export default HomePage;
