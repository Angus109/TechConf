import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Sponsor {
  _id: string;
  name: string;
  logo: string;
  tier: 'gold' | 'silver' | 'bronze';

}

interface SponsorState {
  sponsors: Sponsor[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SponsorState = {
  sponsors: [],
  status: 'idle',
  error: null,
};

export const fetchSponsors = createAsyncThunk(
  'sponsors/fetchSponsors',
  async () => {
    const response = await fetch(`${process.env.URL}/api/sponsors`);
    if (!response.ok) {
      const result = await response.json()
      throw new Error(`${result.message || result.error.message || "Failed to fetch sponsors"}`);
    }
    const result = await response.json();
    const data: Sponsor[] = result.result
    return data;
  }
);

const sponsorSlice = createSlice({
  name: 'sponsors',
  initialState,
  reducers: {
    addSponsor: (state, action: PayloadAction<Sponsor>) => {
      state.sponsors.push(action.payload);
    },
    updateSponsor: (state, action: PayloadAction<Sponsor>) => {
      const index = state.sponsors.findIndex(sponsor => sponsor._id === action.payload._id);
      if (index !== -1) {
        state.sponsors[index] = action.payload;
      }
    },
    removeSponsor: (state, action: PayloadAction<string>) => {
      state.sponsors = state.sponsors.filter(sponsor => sponsor._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSponsors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSponsors.fulfilled, (state, action: PayloadAction<Sponsor[]>) => {
        state.status = 'succeeded';
        state.sponsors = action.payload;
      })
      .addCase(fetchSponsors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { addSponsor, updateSponsor, removeSponsor } = sponsorSlice.actions;
export default sponsorSlice.reducer;