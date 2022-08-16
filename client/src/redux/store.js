import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from './states/app';
import { AuthSlice } from './states/auth';
import { CategorySlice } from './states/categories';
import { ExpensesSlice } from './states/expenses';
import { UsersSlice } from './states/users';



export default configureStore({
    reducer: {
      expenses: ExpensesSlice.reducer,
      app: appSlice.reducer,
      users: UsersSlice.reducer,
      categories: CategorySlice.reducer,
      auth: AuthSlice.reducer

    }
  });
  