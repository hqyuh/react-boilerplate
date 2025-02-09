import { Task } from '@/components/dnd-kit/container';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

type Props = {
  task: Task;
  deleteTask: (id: string | number) => void;
  updateTask: (id: string | number, content: string) => void;
};

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task
    },
    disabled: editMode
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        className='relative flex h-[60px] min-h-[60px] cursor-grab items-center rounded-xl bg-slate-300 p-2.5 text-left opacity-50 hover:bg-slate-400'
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      ></div>
    );
  }

  if (editMode) {
    return (
      <div
        className='relative flex h-[60px] min-h-[60px] cursor-grab items-center rounded-xl bg-slate-300 p-2.5 text-left hover:bg-slate-400'
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <input
          className='flex h-full w-full items-center justify-center rounded border-none bg-transparent focus:outline-none'
          value={task.content}
          autoFocus
          placeholder='Task...'
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              e.preventDefault();
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div
      className='relative flex h-[60px] min-h-[60px] cursor-grab items-center rounded-xl bg-slate-300 p-2.5 text-left hover:bg-slate-400'
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={toggleEditMode}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {task.content}
      {mouseIsOver && (
        <button
          className='stoke-white top-1/2-translate-y-1/2 absolute right-4 rounded p-2'
          onClick={() => deleteTask(task.id)}
        >
          <Trash2 />
        </button>
      )}
    </div>
  );
}

export default TaskCard;
