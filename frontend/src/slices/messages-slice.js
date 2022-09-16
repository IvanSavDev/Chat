/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { removeChannel, getDataChat } from './channels-slice';
import { promisifySocket } from '../utils/utils';

export const createMessage = createAsyncThunk(
  '@@message/send-message',
  async (message, { getState, extra: { socket } }) => {
    const channelId = getState().channels.currentChannelId;
    const dataFromLocalStorage = localStorage.getItem('userId');
    const { username } = JSON.parse(dataFromLocalStorage);
    const createMessageSocket = promisifySocket((...arg) => socket.emit('newMessage', ...arg));
    const responce = await createMessageSocket({
      body: message,
      username,
      channelId,
    });
    return responce;
  },
);

const initialState = {
  entities: {},
  ids: [],
};

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
        state.entities = { ...messages };
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
