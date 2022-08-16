import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../services/axiosInstances';

export const CategoryEmptyState = {
    incomes: [],
    expenses: [],
    loading: false,
    success: false,
  }

  export const getCategories = createAsyncThunk(
    //action type string
    'categories',
    // callback function
    async (token, thunkAPI) => {
      const res = await AxiosInstance.get('/categories', {
        headers: {
            Authorization: `Bearer ${token}`
        }  
    }).then(
      (response) => {
        return response.data}
    )
    .catch((error) => error)
    return res
  })






  export const CategorySlice = createSlice({
    name: 'categories',
    initialState: CategoryEmptyState,
    reducers: {},
    extraReducers: {
      [getCategories.pending]: (state) => {
        state.loading = true
      },
      [getCategories.fulfilled]: (state, action ) => {
        state.incomes = action.payload.incomes
        state.expenses = action.payload.expenses
        state.loading = false
      },
      [getCategories.rejected]: (state) => {
        state.loading = false
      },
    }
  });

  export const { createCategory, deleteCategory } = CategorySlice.actions;

  export default CategorySlice.reducer;