import { configureStore } from '@reduxjs/toolkit';
import { AuthSlice } from './states/auth';
import { CategorySlice } from './states/categories';
import { ExpensesSlice } from './states/expenses';



export default configureStore({
    reducer: {
      expenses: ExpensesSlice.reducer,
      categories: CategorySlice.reducer,
      auth: AuthSlice.reducer

    }
  });
  