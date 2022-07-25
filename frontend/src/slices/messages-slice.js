/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { getDataChat } from './data-slice';
import { removeChannel } from './channels-slice';

const initialState = {
  entities: {},
  ids: [],
};

export const emitMessage = createAsyncThunk(
  '@@message/send-message',
  async (message, { getState, extra: { socket } }) => {
    const channelId = getState().channels.currentChannelId;
    const dataFromLocalStorage = localStorage.getItem('userId');
    const { username } = JSON.parse(dataFromLocalStorage);
    socket.emit('newMessage', {
      body: message,
      username,
      channelId,
    });
  },
);

const messagesSlice = createSlice({
  name: '@@chat/messages-data',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { id } = action.payload;
      const idsState = state.ids;

      state.entities[id] = action.payload;
      if (!idsState.includes(id)) {
        state.ids.push(id);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataChat.fulfilled, (state, { payload }) => {
        const { messages } = payload;
        const idMessages = messages.map((message) => message.id);
        if (!isEqual(state.ids, idMessages)) {
          state.ids = idMessages;
        }
        messages.forEach((message) => {
          state.entities[message.id] = { ...message };
        });
      })
      .addCase(removeChannel, (state, { payload }) => {
        const currentEntities = state.entities;
        state.ids.forEach((id) => {
          if (currentEntities[id].channelId === payload) {
            delete currentEntities[id];
          }
        });
        state.ids = Object.keys(currentEntities);
      });
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
