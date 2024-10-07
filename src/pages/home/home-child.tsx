import { useParams } from 'react-router-dom';

const HomeChildPage = () => {
  const { id } = useParams();

  return <div className='flex h-full w-full items-center justify-center'>HomeChild at here {id}</div>;
};

export default HomeChildPage;
