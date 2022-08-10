/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';

import { getDataChat } from './data-slice';

const initialState = {
  entities: {},
  ids: [],
  currentChannelId: null,
  status: 'fulfiled',
  error: null,
};

export const emitChannel = createAsyncThunk(
  '@@channel/create-channel',
  async ({ name }, { extra: { socket } }) => {
    socket.emit('newChannel', {
      name,
    });
  },
);

export const sendRenameChannel = createAsyncThunk(
  '@@channel/rename-channel',
  async ({ name, id }, { extra: { socket } }) => {
    socket.emit('renameChannel', {
      name,
      id,
    });
  },
);

export const deleteChannel = createAsyncThunk(
  '@@channel/delete-channel',
  async (idChannel, { extra: { socket } }) => {
    socket.emit('removeChannel', { id: idChannel });
  },
);

const channelsSlice = createSlice({
  name: '@@chat/channels-data',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      const { id } = action.payload;
      const idsState = state.ids;
      state.entities[id] = { ...action.payload, messages: [] };
      if (!idsState.includes(id)) {
        state.ids.push(id);
      }
    },
    renameChannel: (state, action) => {
      const { id } = action.payload;
      state.entities[id] = { ...state.entities[id], ...action.payload };
    },
    selectActiveChat: (state, action) => {
      state.currentChannelId = action.payload;
    },
    removeChannel: (state, action) => {
      delete state.entities[action.payload];
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataChat.fulfilled, (state, { payload }) => {
        const { channels, currentChannelId } = payload;
        const idChannels = channels.map((channel) => channel.id);
        if (!isEqual(state.ids, idChannels)) {
          state.ids = idChannels;
        }
        channels.forEach((channel) => {
          state.entities[channel.id] = { ...channel, messages: [] };
        });
        state.currentChannelId = currentChannelId;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'pending';
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state) => {
          state.status = 'pending';
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.status = 'fulfilled';
        },
      );
  },
});

export const {
  selectActiveChat, addChannel, removeChannel, renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
