import TaskCard from '@/components/dnd-kit/task-card';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CirclePlus, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Column, Task } from './container';

type Props = {
  columns: Column;
  deleteColumn: (id: string | number) => void;
  updateColumn: (id: string | number, title: string) => void;
  createTask: (columnId: string | number) => void;
  deleteTask: (id: string | number) => void;
  updateTask: (id: string | number, content: string) => void;
  tasks: Task[];
};

function ColumnContainer({ columns, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask }: Props) {
  const [editMode, setEditMode] = useState<boolean>(false);

  const tasksId = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: columns.id,
    data: {
      type: 'Column',
      columns
    },
    disabled: editMode
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
      <div
        className='text-md flex h-[60px] border-spacing-1 cursor-grab items-center justify-between rounded-md rounded-b-none border-4 bg-slate-300 p-3 font-bold'
        onClick={() => setEditMode(true)}
      >
        <div className='flex items-center gap-2'>
          <div className='flex items-center justify-center rounded-full px-2 py-1 text-sm'>0</div>
          {!editMode && columns.title}
          {editMode && (
            <input
              className='rounded px-2 outline-none focus:border-0 focus:outline-none'
              value={columns.title}
              onChange={(e) => updateColumn(columns.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          className='rounded stroke-gray-500 px-1 py-2 hover:stroke-white'
          onClick={() => deleteColumn(columns.id)}
        >
          <Trash2 />
        </button>
      </div>
      <div className='flex flex-grow flex-col gap-2 overflow-y-auto overflow-x-hidden p-3'>
        <SortableContext items={tasksId}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
          ))}
        </SortableContext>
      </div>
      <button
        className='flex h-[60px] cursor-pointer items-center justify-start gap-2 rounded-lg border-2 pl-3 ring-slate-300 hover:ring-2'
        onClick={() => createTask(columns.id)}
      >
        <CirclePlus />
        Add Task
      </button>
    </div>
  );
}

export default ColumnContainer;
