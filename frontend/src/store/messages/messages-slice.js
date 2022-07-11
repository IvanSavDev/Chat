import { createSlice } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { getDataChat, resetData } from '../loadStartData/data-slice';

const initialState = {
  entities: {},
  ids: [],
  error: null,
  status: 'idl',
};

const messagesSlice = createSlice({
  name: '@@chat/channels-data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataChat.fulfilled, (state, { payload }) => {
        const { messages } = payload;
        const idMessages = messages.map((message) => message.id);
        if (!isEqual(state.ids, idMessages)) {
          state.ids = idMessages;
        }
        messages.forEach(
          (message) => (state.entities[message.id] = { ...message })
        );
      })
      .addCase(resetData, (state) => {
        state = initialState;
      });
  },
});

export default messagesSlice.reducer;
