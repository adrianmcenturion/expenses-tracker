import { createSlice } from '@reduxjs/toolkit';

export const ExpensesEmptyState = {
    amount: 0,
    id: '',
    name: '',
    description: '',
    date: '',
    category: {
        id: '',
        name: '',
    },

  };
  
  export const ExpensesSlice = createSlice({
    name: 'expenses',
    initialState: ExpensesEmptyState,
    reducers: {
      createExpenses: (state, action) => action.payload,
      modifyExpenses: (state, action) => ({ ...state, ...action.payload}),
      resetExpenses: () => ExpensesEmptyState
    }
  });

  export const { createExpenses, modifyExpenses, resetExpenses } = ExpensesSlice.actions;

  export default ExpensesSlice.reducer;