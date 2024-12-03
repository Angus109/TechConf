import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';





interface User {
  _id: string;
  name: string;
  email: string;
  password: string,
}

interface UserState {
  currentUser: User | null;
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  users: [],
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }) => {

    const response = await fetch(`${process.env.URL}/api/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const result = await response.json()
      console.log(result)
      throw new Error(`${result.message || result.error.message || "Error Login"}`);
   
    }

    const result = await response.json()
    const data: User = result.result
    localStorage.removeItem('user_auth_token')
    return data;
  }
);

export const signup = createAsyncThunk(
  'user/signup',
  async (userData: { name: string; email: string; password: string }) => {
    const response = await fetch(`${process.env.URL}/api/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response?.ok) {
      const result = await response.json()
      console.log(result)
      throw new Error(`${result.message || result.error.message || "Error signup"}`);
     
    }
    const result = await response.json();
    const data : User = result.result
    localStorage.removeItem('user_auth_token')
    localStorage.setItem('user_auth_token', result.token)

    return data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        console.log("state",state.status)
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
        state.error = null;
        console.log("state",state.status);
        console.log("user",state.currentUser)
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Login failed';
        console.log("state",state.status)
      })
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Signup failed';
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;