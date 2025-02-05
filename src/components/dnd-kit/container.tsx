import {
  DndContext,
  DragEndEvent,
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

function Container() {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsIds = useMemo(() => columns.map((col) => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3
      }
    })
  );

  function createNewColumn() {
    const newColumn: Column = {
      id: Math.random(),
      title: `Column ${columns.length + 1}`
    };

    setColumns([...columns, newColumn]);
  }

  function deleteColumn(id: string | number) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
  }

  function onDragStart(event: DragStartEvent) {
    console.log('Drag started', event);
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.columns);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeColumnId);
      const overColumnIndex = columns.findIndex((col) => col.id === overColumnId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  return (
    <div>
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className='m-auto flex max-w-full gap-4'>
          <div className='flex gap-4'>
            <SortableContext items={columnsIds}>
              {columns.map((col) => (
                <ColumnContainer key={col.id} columns={col} deleteColumn={deleteColumn} />
              ))}
            </SortableContext>
          </div>

          <button
            className='flex h-[60px] w-[350px] cursor-pointer items-center justify-start gap-2 rounded-lg border-2 pl-3 ring-slate-300 hover:ring-2'
            onClick={() => createNewColumn()}
          >
            <CirclePlus />
            Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && <ColumnContainer columns={activeColumn} deleteColumn={deleteColumn} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default Container;
