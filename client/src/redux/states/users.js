import { createSlice } from '@reduxjs/toolkit';

export const UsersEmptyState = {
    users: {}
  }

  export const UsersSlice = createSlice({
    name: 'users',
    initialState: UsersEmptyState,
    reducers: {
      setIsLoading: (state, action) => { state.isLoading = action.payload },
      setData: (state, action) => { state.data = action.payload }
    }
  });

  export const { setIsLoading, setData } = UsersSlice.actions;

  export default UsersSlice.reducer;