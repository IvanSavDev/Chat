import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getDataChat = createAsyncThunk(
  '@@chat/get-data',
  async (_, { extra: { axios, routes } }) => {
    const userId = localStorage.getItem('userId');
    const request = await axios.get(routes.usersPath(), {
      headers: {
        Authorization: `Bearer ${JSON.parse(userId)}`,
      },
    });
    return request.data;
  }
);

const initialState = {
  status: 'idle',
  error: null,
};

const statusLoadSlice = createSlice({
  name: '@@chat/channels-data',
  initialState,
  reducers: {
    resetData: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataChat.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(getDataChat.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = 'The request failed';
      })
      .addCase(getDataChat.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        state.error = null;
      });
  },
});

export default statusLoadSlice.reducer;

export const { resetData } = statusLoadSlice.actions;
