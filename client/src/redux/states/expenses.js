import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../services/axiosInstances';

export const ExpensesEmptyState = {
    balance: 0,
    income: 0,
    expense: 0,
    transactions: 0,
    movements: [],
    categoryBalance: [],
    loading: false,
    success: false,
    error: false
  };


  export const getBalance = createAsyncThunk(
    //action type string
    'expenses/balance',
    // callback function
    async (token, thunkAPI) => {

      try {
        const res = await AxiosInstance.get('/expenses/balance', {
          headers: {
              Authorization: `Bearer ${token}`
          }  
        })
        
        return res.data
        
      } catch (error) {

        return thunkAPI.rejectWithValue(error.response.data.message)
      }
    })



  export const getMovements = createAsyncThunk(
    //action type string
    'expenses',
    // callback function
    async (token, thunkAPI) => {

      try {
        const res = await AxiosInstance.get('/expenses/', {
          headers: {
              Authorization: `Bearer ${token}`
          }  
      })
      return res.data

      } catch (error) {

        return thunkAPI.rejectWithValue(error.response.data.message)
      }
  })


  export const getLastMovements = createAsyncThunk(
    //action type string
    'expenses/last',
    // callback function
    async (token, thunkAPI) => {

      try {
        const res = await AxiosInstance.get('/expenses/last', {
          headers: {
              Authorization: `Bearer ${token}`
          }  
      })
      return res.data
        
      } catch (error) {

        return thunkAPI.rejectWithValue(error.response.data.message)
      }
  })

  export const addExpense = createAsyncThunk(
    //action type string
    'expenses/add',
    // callback function
    async ({name, date, amount, category, type, token}, thunkAPI) => {

      try {
        const res = await AxiosInstance.post('/expenses/create', { name, date, amount, category, type }, {
          headers: {
              Authorization: `Bearer ${token}`
          }  
      })
      return res.statusText
      } catch (error) {

        return thunkAPI.rejectWithValue(error.response.data.message)
      }
  })

  export const getCategoryBalance = createAsyncThunk(
    //action type string
    'expenses/balance/category',
    // callback function
    async (token, thunkAPI) => {

      try {
        const res = await AxiosInstance.get('/expenses/balance/category', {
          headers: {
              Authorization: `Bearer ${token}`
          }  
      })
      return res.data
      } catch (error) {

        return thunkAPI.rejectWithValue(error.response.data.message)
      }
  })

  export const deleteExpenses = createAsyncThunk(
    //action type string
  'expense/delete',
  // callback function
  async ({id, token},thunkAPI) => {

    try {

      const res = await AxiosInstance.delete(`/expenses/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }  
    })
      
    return

    } catch (error) {
      return thunkAPI.rejectWithValue('Error when logging')
    }
})


export const updateExpense = createAsyncThunk(
  //action type string
  'expenses/update',
  // callback function
  async ({id, name, date, amount, category, type, token}, thunkAPI) => {

    try {
      const res = await AxiosInstance.put('/expenses/update', { id, name, date, amount, category, type }, {
        headers: {
            Authorization: `Bearer ${token}`
        }  
    })
    return res.statusText
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
})



  
  export const ExpensesSlice = createSlice({
    name: 'expenses',
    initialState: ExpensesEmptyState,
    reducers: {
      createExpenses: (state, action) => action.payload,
      modifyExpenses: (state, action) => ({ ...state, ...action.payload}),
      // deleteExpenses: (state, action) => action.payload
    },
    extraReducers: {
      [getBalance.pending]: (state) => {
        state.loading = true
        state.error = false
      },
      [getBalance.fulfilled]: (state, action ) => {
        state.balance = action.payload.balance
        state.income = action.payload.income
        state.expense = action.payload.expense
        state.transactions = action.payload.transactions
        state.loading = false
        state.error = false
      },
      [getBalance.rejected]: (state, action) => {
        state.loading = false
        state.error = action.payload
      },
      [getMovements.pending]: (state) => {
        state.loading = true
        state.error = false
      },
      [getMovements.fulfilled]: (state, action ) => {
        state.movements = action.payload
        state.loading = false
        state.error = false
      },
      [getMovements.rejected]: (state, action) => {
        state.loading = false
        state.error = action.payload
      },
      [getLastMovements.pending]: (state) => {
        state.loading = true
        state.error = false
      },
      [getLastMovements.fulfilled]: (state, action ) => {
        state.movements = action.payload
        state.loading = false
        state.error = false
      },
      [getLastMovements.rejected]: (state, action) => {
        state.loading = false
        state.error = action.payload
      },
      [addExpense.pending]: (state) => {
        state.loading = true
        state.success = false
        state.error = false
      },
      [addExpense.fulfilled]: (state, action ) => {
        state.loading = false
        state.success = true
        state.error = false
      },
      [addExpense.rejected]: (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
      },
      [getCategoryBalance.pending]: (state) => {
        state.loading = true
        state.error = false
      },
      [getCategoryBalance.fulfilled]: (state, action ) => {
        state.categoryBalance = action.payload
        state.loading = false
        state.error = false
      },
      [getCategoryBalance.rejected]: (state, action) => {
        state.loading = false
        state.error = action.payload
      },
      [deleteExpenses.pending]: (state) => {
        state.loading = true
        state.success = false
        state.error = false
      },
      [deleteExpenses.fulfilled]: (state ) => {
        state.loading = false
        state.success = true
        state.error = false
      },
      [deleteExpenses.rejected]: (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
      },
      [updateExpense.pending]: (state) => {
        state.loading = true
        state.success = false
        state.error = false
      },
      [updateExpense.fulfilled]: (state, action ) => {
        state.loading = false
        state.success = true
        state.error = false
      },
      [updateExpense.rejected]: (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
      },
    }
  });

  export const { createExpenses, modifyExpenses, } = ExpensesSlice.actions;

  export default ExpensesSlice.reducer;