import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../services/axiosInstances';

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
      (response) => response.data.accessToken
    )
    .catch((error) => error)
    return res
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
    reducers: {
      logout: (state) => { state = AuthEmptyState}
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

  export const { logout } = AuthSlice.actions;

  export default AuthSlice.reducer;