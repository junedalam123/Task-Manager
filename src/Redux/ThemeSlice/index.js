import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { isDarkMode: localStorage.getItem('theme') === 'dark' },
  reducers: {
    toggleTheme: (state,actions) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light');
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
