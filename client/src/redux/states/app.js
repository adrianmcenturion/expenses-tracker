import { createSlice } from '@reduxjs/toolkit';

export const AppEmptyState = {
    isLoading: false,
    data: false,
  }

  export const appSlice = createSlice({
    name: 'app',
    initialState: AppEmptyState,
    reducers: {
      setIsLoading: (state, action) => { state.isLoading = action.payload },
      setData: (state, action) => { state.data = action.payload }
    }
  });

  export const { setIsLoading, setData } = appSlice.actions;

  export default appSlice.reducer;