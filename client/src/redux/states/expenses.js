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
  };


  export const getBalance = createAsyncThunk(
    //action type string
    'expenses/balance',
    // callback function
    async (token, thunkAPI) => {
      const res = await AxiosInstance.get('/expenses/balance', {
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


  export const getMovements = createAsyncThunk(
    //action type string
    'expenses',
    // callback function
    async (token, thunkAPI) => {
      const res = await AxiosInstance.get('/expenses/', {
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


  export const getLastMovements = createAsyncThunk(
    //action type string
    'expenses/last',
    // callback function
    async (token, thunkAPI) => {
      const res = await AxiosInstance.get('/expenses/last', {
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

  export const addExpense = createAsyncThunk(
    //action type string
    'expenses/add',
    // callback function
    async ({name, date, amount, category, type, token}, thunkAPI) => {
      const res = await AxiosInstance.post('/expenses/create', { name, date, amount, category, type }, {
        headers: {
            Authorization: `Bearer ${token}`
        }  
    }).then(
      (response) => {
        return response.statusText}
    )
    .catch((error) => error)
    return res
  })

  export const getCategoryBalance = createAsyncThunk(
    //action type string
    'expenses/balance/category',
    // callback function
    async (token, thunkAPI) => {
      const res = await AxiosInstance.get('/expenses/balance/category', {
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







  
  export const ExpensesSlice = createSlice({
    name: 'expenses',
    initialState: ExpensesEmptyState,
    reducers: {
      createExpenses: (state, action) => action.payload,
      modifyExpenses: (state, action) => ({ ...state, ...action.payload}),
      resetExpenses: () => ExpensesEmptyState
    },
    extraReducers: {
      [getBalance.pending]: (state) => {
        state.loading = true
      },
      [getBalance.fulfilled]: (state, action ) => {
        state.balance = action.payload.balance
        state.income = action.payload.income
        state.expense = action.payload.expense
        state.transactions = action.payload.transactions
        state.loading = false
      },
      [getBalance.rejected]: (state) => {
        state.loading = false
      },
      [getMovements.pending]: (state) => {
        state.loading = true
      },
      [getMovements.fulfilled]: (state, action ) => {
        state.movements = action.payload
        state.loading = false
      },
      [getMovements.rejected]: (state) => {
        state.loading = false
      },
      [getLastMovements.pending]: (state) => {
        state.loading = true
      },
      [getLastMovements.fulfilled]: (state, action ) => {
        state.movements = action.payload
        state.loading = false
      },
      [getLastMovements.rejected]: (state) => {
        state.loading = false
      },
      [addExpense.pending]: (state) => {
        state.loading = true
        state.success = false
      },
      [addExpense.fulfilled]: (state, action ) => {
        state.loading = false
        state.success = true
      },
      [addExpense.rejected]: (state) => {
        state.loading = false
        state.success = false
      },
      [getCategoryBalance.pending]: (state) => {
        state.loading = true
      },
      [getCategoryBalance.fulfilled]: (state, action ) => {
        state.categoryBalance = action.payload
        state.loading = false
      },
      [getCategoryBalance.rejected]: (state) => {
        state.loading = false
      }
    }
  });

  export const { createExpenses, modifyExpenses, resetExpenses } = ExpensesSlice.actions;

  export default ExpensesSlice.reducer;