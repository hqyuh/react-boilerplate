import { Metadata } from '@/components/metadata/metadata';
import { useParams } from '@tanstack/react-router';

const HomeChildPage = () => {
  const { id } = useParams({ strict: false });

  return (
    <>
      <Metadata title={`Home child ${id}`} />
      <div className='flex h-full w-full items-center justify-center'>HomeChild at here {id}</div>
    </>
  );
};

export default HomeChildPage;
