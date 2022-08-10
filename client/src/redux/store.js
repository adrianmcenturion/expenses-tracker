import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from './states/app';
import { ExpensesSlice } from './states/expenses';



export default configureStore({
    reducer: {
      expenses: ExpensesSlice.reducer,
      app: appSlice.reducer,

    }
  });
  