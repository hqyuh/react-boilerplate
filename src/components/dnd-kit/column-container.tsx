import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2 } from 'lucide-react';

import { Column } from './container';

type Props = {
  columns: Column;
  deleteColumn: (id: string | number) => void;
};

function ColumnContainer(props: Props) {
  const { columns, deleteColumn } = props;

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: columns.id,
    data: {
      type: 'Column',
      columns
    }
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  if (isDragging) {
    return (
      <div
        className='flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-4 border-slate-300 bg-slate-100 opacity-50'
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      ></div>
    );
  }

  return (
    <div
      className='flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md bg-slate-100'
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className='text-md flex h-[60px] border-spacing-1 cursor-grab items-center justify-between rounded-md rounded-b-none border-4 bg-slate-300 p-3 font-bold'>
        <div className='flex items-center gap-2'>
          <div className='flex items-center justify-center rounded-full px-2 py-1 text-sm'>0</div>
          {columns.title}
        </div>
        <button
          className='rounded stroke-gray-500 px-1 py-2 hover:stroke-white'
          onClick={() => deleteColumn(columns.id)}
        >
          <Trash2 />
        </button>
      </div>
      <div className='flex flex-grow'>Content</div>
    </div>
  );
}

export default ColumnContainer;
