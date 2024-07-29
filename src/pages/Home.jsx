
import MenuGridLayout from '../components/MenuGridLayout';

const pageText="Select from one of the options below"

const Home = () => {
  return (
    <MenuGridLayout 
    pageText={pageText}
    numItems={4}
    />
  );
};

export default Home;
