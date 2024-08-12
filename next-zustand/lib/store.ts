import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import { persist } from 'zustand/middleware'

export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE'

export type Task = {
  id: string
  title: string
  description?: string
  status: Status
}

export type State = {
  tasks: Task[]
  draggedTask: string | null
}

export type Actions = {
  addTask: (title: string, description?: string) => void
  dragTask: (id: string | null) => void
  removeTask: (title: string) => void
  updateTask: (title: string, status: Status) => void
}

export const useTaskStore = create<State & Actions>()(
  persist(
    set => ({
      tasks: [],
      draggedTask: null,
      addTask: (title: string, description?: string) =>
        set(state => ({
          tasks: [
            ...state.tasks,
            { id: uuid(), title, description, status: 'TODO' }
          ]
        })),
      dragTask: (id: string | null) => set({ draggedTask: id }),
      removeTask: (id: string) =>
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== id)
        })),
      updateTask: (id: string, status: Status) =>
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id ? { ...task, status } : task
          )
        }))
    }),
    { name: 'task-store', skipHydration: true }
  )
)

/* 
import { create } from  'zustand';
import { v4 as uuid } from 'uuid'
import { v4 as uuid } from 'uuid'
eport type Status = 'TODO' | 'IN_PROGRESS' | 'DONE'
// individual task
export type Task = {
  id: string
  title:string
  description?: string
  status: Status
}

//define the type
export type State = {
  task: Task []
}

export type Actions = {
 addTask:(title: string, description?: string) =>
  removeTask: (id: string) => void
 updateTask: (id: string, status: Status) => void 
}
export const useTaskStore = create<State & Actions>()(() => ({
task:[],
addTask: (title: string, description?: string) => 
set((state) => ({
  task: [
    ...state.task,
    {id: uuid(), title, desciption, status: 'TODO'}
]
})),
removeTask: () => {},
updateTask: () => {}

}))


*/