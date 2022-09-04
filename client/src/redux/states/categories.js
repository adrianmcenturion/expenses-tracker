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

      try {
        const res = await AxiosInstance.get('/categories', {
          headers: {
              Authorization: `Bearer ${token}`
          }  
      })
      return res.data
      } catch (error) {
        return thunkAPI.rejectWithValue(error)
      }

  })

  export const createCategories = createAsyncThunk(
    //action type string
    'categories/create',
    // callback function
    async ({name, type, token}, thunkAPI) => {

      try {
        const res = await AxiosInstance.post('/categories/create', {name, type}, {
          headers: {
              Authorization: `Bearer ${token}`
          }  
      })
      return 
      } catch (error) {
        return thunkAPI.rejectWithValue(error)
      }

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
      [createCategories.pending]: (state) => {
        state.loading = true
        state.success = false
      },
      [createCategories.fulfilled]: (state, action ) => {
        state.loading = false
        state.success = true
      },
      [createCategories.rejected]: (state) => {
        state.loading = false
        state.success = false
      },
    }
  });

  export const { createCategory, deleteCategory } = CategorySlice.actions;

  export default CategorySlice.reducer;