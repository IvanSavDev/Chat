/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { promisifySocket } from '../utils/utils';

const initialState = {
  entities: {},
  ids: [],
  currentChannelId: null,
  status: 'fulfilled',
};

export const getDataChat = createAsyncThunk(
  '@@chat/get-data',
  async (_, { extra: { axios, routes }, rejectWithValue }) => {
    try {
      const userId = localStorage.getItem('userId');
      const { token } = JSON.parse(userId);
      const request = await axios.get(routes.usersPath(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return request.data;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const createChannelRequest = createAsyncThunk(
  '@@channel/create-channel',
  async (dataToCreate, { extra: { socket } }) => {
    const createChannelSocket = promisifySocket((...args) => socket.emit('newChannel', ...args));
    const responce = await createChannelSocket(dataToCreate);
    return responce;
  },
);

export const renameChannelRequest = createAsyncThunk(
  '@@channel/rename-channel',
  async (dataToRename, { extra: { socket } }) => {
    const renameChannelSocket = promisifySocket((...args) => socket.emit('renameChannel', ...args));
    const responce = await renameChannelSocket(dataToRename);
    return responce;
  },
);

export const deleteChannelRequest = createAsyncThunk(
  '@@channel/delete-channel',
  async (dataToDelete, { extra: { socket } }) => {
    const deleteChannelSocket = promisifySocket((...args) => socket.emit('removeChannel', ...args));
    const responce = await deleteChannelSocket(dataToDelete);
    return responce;
  },
);

const channelsSlice = createSlice({
  name: '@@chat/channels-data',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      const { id } = action.payload;
      state.entities[id] = { ...action.payload };
      if (!state.ids.includes(id)) {
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
        const idsChannels = channels.map((channel) => channel.id);
        if (!isEqual(state.ids, idsChannels)) {
          state.ids = idsChannels;
        }
        channels.forEach((channel) => {
          state.entities[channel.id] = { ...channel };
        });
        state.currentChannelId = currentChannelId;
      })
      .addMatcher(
        (action) => action.type.endsWith('channel/pending'),
        (state) => {
          state.status = 'pending';
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('channel/rejected'),
        (state) => {
          state.status = 'rejected';
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('channel/fulfilled'),
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
