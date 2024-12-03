import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Orgerniser {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean
}

interface OganiserState {
  currentOrganiser: Orgerniser | null;
  organisers: Orgerniser[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OganiserState = {
  currentOrganiser: null,
  organisers: [],
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk(
  'organiser/login',
  async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${process.env.URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const result = await response.json()
      throw new Error(`${result.message || result.error.message || "Login failed"}`);
    }
    const result = await response.json();
    const data: Orgerniser = result.result
    localStorage.removeItem('admin_auth_token')
    localStorage.setItem('admin_auth_token', result.token)
    return data;
  }
);

export const signup = createAsyncThunk(
  'organiser/signup',
  async (userData: { name: string; email: string; password: string, code: string }) => {
    const response = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const result = await response.json()
      throw new Error(`${result.message || result.error.message || "Signup failed"}`);
    }
    const result = await response.json();
    const data: Orgerniser = result.result
    localStorage.removeItem('admin_auth_token')
    localStorage.setItem('admin_auth_token', result.token)
    return data;
  }
);

const organiserSlice = createSlice({
  name: 'organiser',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentOrganiser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<Orgerniser>) => {
        state.status = 'succeeded';
        state.currentOrganiser = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Login failed';
      })
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<Orgerniser>) => {
        state.status = 'succeeded';
        state.currentOrganiser = action.payload;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Signup failed';
      });
  },
});

export const { logout } = organiserSlice.actions;
export default organiserSlice.reducer;