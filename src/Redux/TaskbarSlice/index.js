import { createSlice } from "@reduxjs/toolkit";

const taskbarSlice = createSlice({
  name: "taskbar",
  initialState: {
    tasks: [],
    activeTab: "all",
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const { id, title, description } = action.payload;
      const taskToUpdate = state.tasks.find((task) => task.id === id);
      if (taskToUpdate) {
        taskToUpdate.title = title;
        taskToUpdate.description = description;
      }
    },
    toggleTaskStatus: (state, action) => {
      const { id } = action.payload;
      const taskToToggle = state.tasks.find((task) => task.id === id);
      if (taskToToggle) {
        taskToToggle.status = !taskToToggle.status; 
      }
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { addTask, removeTask, updateTask,toggleTaskStatus,setActiveTab } = taskbarSlice.actions;
export default taskbarSlice.reducer;



export const selectFilteredTasks = (state) => {
  const { tasks, activeTab } = state?.AllTask;
  if (activeTab === "all") {
    return tasks;
  } else if (activeTab === "pending") {
    return tasks.filter((task) => !task.status);
  } else if (activeTab === "success") {
    return tasks.filter((task) => task.status);
  }
};