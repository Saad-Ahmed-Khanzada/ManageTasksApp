// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Task {
//   id: string;
//   name: string;
//   priority: string;
//   completed: boolean;
//   completedAt?: number;
// }

// const initialState: Task[] = [];

// const tasksSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {
//     addTask: (state, action: PayloadAction<Task>) => {
//       state.push(action.payload);
//     },
//     toggleCompletion: (state, action: PayloadAction<string>) => {
//       const task = state.find(task => task.id === action.payload);
//       if (task) {
//         task.completed = !task.completed;
//         task.completedAt = task.completed ? Date.now() : undefined;
//       }
//     },
//     deleteTask: (state, action: PayloadAction<string>) => {
//       return state.filter(task => task.id !== action.payload);
//     },
//     archiveTasks: (state) => {
//       const currentTime = Date.now();
//       return state.filter(task => !task.completed || currentTime - (task.completedAt ?? 0) < 24 * 60 * 60 * 1000);
//     },
//   },
// });

// export const { addTask, toggleCompletion, deleteTask, archiveTasks } = tasksSlice.actions;
// export default tasksSlice.reducer;
