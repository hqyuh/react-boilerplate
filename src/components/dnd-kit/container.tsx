import TaskCard from '@/components/dnd-kit/task-card';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { CirclePlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import ColumnContainer from './column-container';

export type Column = {
  id: string | number;
  title: string;
};

export type Task = {
  id: string | number;
  columnId: string | number;
  content: string;
};

function Container() {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsIds = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // When use click button delete, dnd-kit will think it's a drag, not a delete button
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3 // Must drag at least 3px to activate
      }
    })
  );

  function createNewColumn() {
    const newColumn: Column = {
      id: Math.floor(Math.random() * 10001),
      title: `Column ${columns.length + 1}`
    };

    setColumns([...columns, newColumn]);
  }

  function updateColumn(id: string | number, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  function deleteColumn(id: string | number) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((task) => task.columnId !== id);
    setTasks(newTasks);
  }

  function createTask(columnId: string | number): void {
    const newTask: Task = {
      id: Math.floor(Math.random() * 10001),
      columnId,
      content: `Task ${tasks.length + 1}`
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: string | number) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  function updateTask(id: string | number, content: string): void {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  function onDragStart(event: DragStartEvent) {
    console.log('Drag started', event);
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.columns);
      return;
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    console.log('Drag ended', event);
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeColumnId);
      const overColumnIndex = columns.findIndex((col) => col.id === overColumnId);
      // arrayMove is a helper function that moves an element from one index to another.
      // arrayMove(array, fromIndex, toIndex)
      // array: Original array.
      // fromIndex: Position of the element to be moved.
      // toIndex: New position of the element after moving.
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    console.log('Drag over', event);
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isActiveATask) return;

    // dropping a task over another task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((task) => task.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverColumn = over.data.current?.type === 'Column';

    // dropping a task over a column

    if (isOverColumn && isActiveATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  return (
    <div className='mb-4 flex flex-col gap-4'>
      <button
        className='mt-2 flex h-[60px] w-[350px] cursor-pointer items-center justify-start gap-2 rounded-lg border-2 pl-3 ring-slate-300 hover:ring-2'
        onClick={() => createNewColumn()}
      >
        <CirclePlus />
        Add Column
      </button>

      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
        <div className='m-auto flex max-w-full gap-4'>
          <div className='flex gap-4'>
            <SortableContext items={columnsIds}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  columns={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
            </SortableContext>
          </div>
        </div>

        {/* DragOverlay used to create the effect of displaying a copy of the element being dragged. */}
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                columns={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
            {activeTask && <TaskCard task={activeTask} deleteTask={deleteTask} updateTask={updateTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default Container;
