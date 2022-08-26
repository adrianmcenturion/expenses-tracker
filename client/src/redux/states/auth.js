import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../services/axiosInstances";
import {
  clearLocalStorage,
  persistLocalStorage,
} from "../../utils/LocalStorageFunctions";

const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null

export const AuthEmptyState = {
  token,
  userInfo: {},
  loading: false,
  success: false,
  error: null
};

export const Login = createAsyncThunk(
  //action type string
  'auth/login',
  // callback function
  async ({email, password},thunkAPI) => {

    try {

      const response = await AxiosInstance.post('/auth/login', { email, password })
      persistLocalStorage('token', response.data.accessToken)
      thunkAPI.dispatch(userInfoAction(response.data.accessToken))
      return response.data.accessToken

    } catch (error) {
        return thunkAPI.rejectWithValue('Error when logging')
    }
})

export const Register = createAsyncThunk(
  //action type string
  "auth/register",
  // callback function
  async ({ name, email, password, role }, thunkAPI) => {


    try {
      const response = await AxiosInstance.post("/auth/register", {name, email, password, role})
      return "registered";
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  })

export const AuthSlice = createSlice({
  name: "auth",
  initialState: AuthEmptyState,
  reducers: {
    logout: (state) => {
      clearLocalStorage("token");
      return AuthEmptyState;
    },
    userInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: {
    [Login.pending]: (state) => {
      state.loading = true
      state.error = null
      state.success = false
    },
    [Login.fulfilled]: (state, action ) => {
      state.token = action.payload
      state.loading = false
      state.success = true
      state.error = false
    },
    [Login.rejected]: (state, action) => {
      state.loading = false
      state.error = true
      state.success = false
    },

    [Register.pending]: (state) => {
      state.loading = true;
    },
    [Register.fulfilled]: (state) => {
      state.loading = false;
    },
    [Register.rejected]: (state) => {
      state.loading = false;
    },
  },
});


export const userInfoAction = (token) => async (dispatch) => {
  try {
    const response = await AxiosInstance.get("/auth/info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(userInfo(response.data))
    return response.data
  } catch (error) {
    console.log(error);
  }
};

export const { logout, userInfo } = AuthSlice.actions;

export default AuthSlice.reducer;
