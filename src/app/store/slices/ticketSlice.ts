import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Ticket {
  _id: string;
  name: string,
  email: string,
  type: 'Regular' | 'VIP' | 'Early Bird'
}

interface TicketState {
  tickets: Ticket[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TicketState = {
  tickets: [],
  status: 'idle',
  error: null,
};

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async () => {
    const response = await fetch(`${process.env.URL}/`);
    if (!response.ok) {
      const result = await response.json()
      throw new Error(`${result.message || result.error.message || "Failed To Tickets"}`);
    }
    const result = await response.json();
    const data: Ticket[] = result.result
    return data;
  }
);

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.push(action.payload);
    },
    updateTicket: (state, action: PayloadAction<Ticket>) => {
      const index = state.tickets.findIndex(ticket => ticket._id === action.payload._id);
      if (index !== -1) {
        state.tickets[index] = action.payload;
      }
    },
    removeTicket: (state, action: PayloadAction<string>) => {
      state.tickets = state.tickets.filter(ticket => ticket._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTickets.fulfilled, (state, action: PayloadAction<Ticket[]>) => {
        state.status = 'succeeded';
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { addTicket, updateTicket, removeTicket } = ticketSlice.actions;
export default ticketSlice.reducer;