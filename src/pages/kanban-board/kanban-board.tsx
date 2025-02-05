import Container from '@/components/dnd-kit/container';
import { Metadata } from '@/components/metadata/metadata';

const KanbanBoardPage = () => (
  <div className='flex h-full w-full items-center justify-center overflow-x-auto'>
    <Metadata title='Dashboard' />
    <Container />
  </div>
);

export default KanbanBoardPage;
