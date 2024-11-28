import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  name: string;
  priority: 'High' | 'Medium' | 'Low'; 
  completed: boolean;
  completedAt?: number;
  dueDate: string | null;
}

const initialState = {
  tasks: [] as Task[],
  archivedTasks: [] as Task[],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      const task = {
        ...action.payload,
        dueDate: action.payload.dueDate ? new Date(action.payload.dueDate).toISOString() : null,
      };
      state.tasks.push(task);
      state.tasks.sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    },
    
    toggleCompletion: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.completedAt = task.completed ? Date.now() : undefined;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    archiveTasks: (state) => {
      const currentTime = Date.now();
      const toArchive = state.tasks.filter(
        (task) => task.completed && currentTime - (task.completedAt ?? 0) >= 0
      );
      state.archivedTasks.push(...toArchive); 
      state.tasks = state.tasks.filter((task) => !toArchive.includes(task));
    },
    autoArchiveTasks: (state) => {
      const currentTime = Date.now();
      const toArchive = state.tasks.filter(
        (task) => task.completed && currentTime - (task.completedAt ?? 0) >= 10 * 1000
      );
      state.archivedTasks.push(...toArchive);
      state.tasks = state.tasks.filter((task) => !toArchive.includes(task));
    },
  },
});

export const { addTask, toggleCompletion, deleteTask, archiveTasks, autoArchiveTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
