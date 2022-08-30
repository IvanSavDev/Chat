/* eslint-disable no-new */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';

const initialState = {
  entities: {},
  ids: [],
  currentChannelId: null,
  status: 'fulfiled',
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

export const emitChannel = createAsyncThunk(
  '@@channel/create-channel',
  async ({ name }, { extra: { socket }, rejectWithValue }) => {
    try {
      const promise = new Promise((resolve) => {
        setTimeout(() => resolve(3), 3000);
      });
      await promise;
      socket.emit('newChannel', {
        name,
      });
      return null;
    } catch {
      return rejectWithValue('emit channel error');
    }
  },
);

export const sendRenameChannel = createAsyncThunk(
  '@@channel/rename-channel',
  async ({ name, id }, { extra: { socket }, rejectWithValue }) => {
    try {
      const promise = new Promise((resolve) => {
        setTimeout(() => resolve(3), 3000);
      });
      await promise;
      socket.emit('renameChannel', {
        name,
        id,
      });
      return null;
    } catch {
      return rejectWithValue('send rename channel');
    }
  },
);

export const deleteChannel = createAsyncThunk(
  '@@channel/delete-channel',
  async (idChannel, { extra: { socket }, rejectWithValue }) => {
    try {
      const promise = new Promise((resolve) => {
        setTimeout(() => resolve(3), 3000);
      });
      await promise;
      await socket.emit('removeChannel', { id: idChannel });
      return null;
    } catch {
      return rejectWithValue('delete error');
    }
  },
);

const channelsSlice = createSlice({
  name: '@@chat/channels-data',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      const { id } = action.payload;
      const idsState = state.ids;
      state.entities[id] = { ...action.payload };
      if (!idsState.includes(id)) {
        state.ids.push(id);
      }
    },
    renameChannel: (state, action) => {
      console.log(action);
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
