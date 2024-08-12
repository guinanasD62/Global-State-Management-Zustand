'use client'

import { Status, useTaskStore } from '@/lib/store'
import Task from './task'
import { useEffect, useMemo } from 'react'

export default function Column({
  title,
  status
}: {
  title: string
  status: Status
}) {
  //task 
  const tasks = useTaskStore(state => state.tasks)
  const filteredTasks = useMemo(
    () => tasks.filter(task => task.status === status),
    [tasks, status]
  )
  //added
  const updateTask = useTaskStore(state => state.updateTask)
  const dragTask = useTaskStore(state => state.dragTask)

  const draggedTask = useTaskStore(state => state.draggedTask)

  useEffect(() => {
    useTaskStore.persist.rehydrate()
  }, [])

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggedTask) return //check if there is drag else return nothing
    updateTask(draggedTask, status)
    dragTask(null)
  }

  return (
    <section className='h-[600px] flex-1'>
      <h2 className='ml-1 font-serif text-2xl font-semibold'>{title}</h2>

      <div
        className='mt-3.5 h-full w-full rounded-xl bg-gray-700/50 p-4'
        onDrop={handleDrop} //
        onDragOver={e => e.preventDefault()}//prevent , nothing  happend if we drag task all arround
      >
        <div className='flex flex-col gap-4'>
          {filteredTasks.map(task => (
            <Task key={task.id} {...task} />
          ))}

          {filteredTasks.length === 0 && status === 'TODO' && (
            <div className='mt-8 text-center text-sm text-gray-500'>
              <p>Create a new task</p>
            </div>
          )}

          {tasks.length && filteredTasks.length === 0 && status !== 'TODO' ? (
            <div className='mt-8 text-center text-sm text-gray-500'>
              <p>Drag your tasks here</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
