/* eslint-disable no-console */
import { DateRangePicker } from '@/components/date-range-picker';
import Container from '@/components/dnd-kit/container';
import { Metadata } from '@/components/metadata/metadata';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { parseAsInteger, useQueryState } from 'nuqs';

const KanbanBoardPage = () => {
  const [hello, setHello] = useQueryState('hello', { defaultValue: '' });
  const [count, setCount] = useQueryState('count', parseAsInteger.withDefault(0));

  return (
    <div>
      <Metadata title='Dashboard' />
      <Container />
      <div className='rounded-lg bg-gray-100 p-4 shadow-md'>
        <Button className='mb-2' onClick={() => setCount((c) => c + 1)}>
          Count: {count}
        </Button>
        <Input value={hello} placeholder='Enter your name' onChange={(e) => setHello(e.target.value || '')} />
        <p className='mt-2 text-lg font-medium'>Hello, {hello || 'anonymous visitor'}!</p>
      </div>
      <div className='mt-4'>
        <DateRangePicker
          onUpdate={(values) => console.log(values)}
          // initialDateFrom='2025-01-01'
          // initialDateTo='2025-12-31'
          align='start'
          locale='en-GB'
          showCompare={false}
        />
      </div>
    </div>
  );
};

export default KanbanBoardPage;
