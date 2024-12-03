import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Speaker {
  _id: string;
  name: string;
  bio: string;
  image: string;
  role: string,
  company: string
}

interface SpeakerState {
  speakers: Speaker[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SpeakerState = {
  speakers: [],
  status: 'idle',
  error: null,
};

export const fetchSpeakers = createAsyncThunk(
  'speakers/fetchSpeakers',
  async () => {
    const response = await fetch(`${process.env.URL}/api/speaker`);
    if (!response.ok) {
      const result = await response.json()

      throw new Error(`${result.message || result.error.message || 'Failed to fetch speakers'}`);
    }
    const result = await response.json();
    const data: Speaker[] = result.result
    console.log(data)
    return data;
  }
);

const speakerSlice = createSlice({
  name: 'speakers',
  initialState,
  reducers: {
    addSpeaker: (state, action: PayloadAction<Speaker>) => {
      state.speakers.push(action.payload);
    },
    updateSpeaker: (state, action: PayloadAction<Speaker>) => {
      const index = state.speakers.findIndex(speaker => speaker._id === action.payload._id);
      if (index !== -1) {
        state.speakers[index] = action.payload;
      }
    },
    removeSpeaker: (state, action: PayloadAction<string>) => {
      state.speakers = state.speakers.filter(speaker => speaker._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpeakers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSpeakers.fulfilled, (state, action: PayloadAction<Speaker[]>) => {
        state.status = 'succeeded';
        state.speakers = action.payload;
      })
      .addCase(fetchSpeakers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { addSpeaker, updateSpeaker, removeSpeaker } = speakerSlice.actions;
export default speakerSlice.reducer;