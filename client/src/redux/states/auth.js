import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../services/axiosInstances';
import { clearLocalStorage } from '../../utils/LocalStorageFunctions';
// import { clearLocalStorage, persistLocalStorage } from '../../utils/LocalStorageFunctions';

export const AuthEmptyState = {
    token: null,
    userInfo: {},
    loading: false,
  }


  export const Login = createAsyncThunk(
    //action type string
    'auth/login',
    // callback function
    async ({email, password},thunkAPI) => {
      const res = await AxiosInstance.post('/auth/login', { email, password }).then(
      (response) => {
        // persistLocalStorage('token', response.data)
        return response.data.accessToken
      }
    )
    .catch((error) => {

      return res
    })
  })


  export const Register = createAsyncThunk(
    //action type string
    'auth/register',
    // callback function
    async ({name, email, password, role},thunkAPI) => {
      const res = await AxiosInstance.post('/auth/register', { name, email, password, role }).then(
      (response) => {
        return 'registered'}
    )
    .catch((error) => error)
    return res
  })


  export const AuthSlice = createSlice({
    name: 'auth',
    initialState: AuthEmptyState,
    // initialState: localStorage.getItem('token') ? localStorage.getItem('token') : AuthEmptyState,
    reducers: {
      login: (state, action) => {
        state.token = action.payload;                      
      },
      logout: () => {
          clearLocalStorage('token')
          return AuthEmptyState
        }
    },
    extraReducers: {
      [Login.pending]: (state) => {
        state.loading = true
      },
      [Login.fulfilled]: (state, action ) => {
        state.token = action.payload
        state.loading = false
      },
      [Login.rejected]: (state) => {
        state.loading = false
      },

      [Register.pending]: (state) => {
        state.loading = true
      },
      [Register.fulfilled]: (state) => {
        state.loading = false
      },
      [Register.rejected]: (state) => {
        state.loading = false
      },
    }
  });

  export const { logout, login } = AuthSlice.actions;

  export default AuthSlice.reducer;