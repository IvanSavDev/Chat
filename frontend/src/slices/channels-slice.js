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
  async (nameChannel, { getState, rejectWithValue, extra: { socket } }) => {
    try {
      const { ids, entities } = getState().channels;
      ids.forEach((id) => {
        if (entities[id].name === nameChannel) {
          throw Error('A channel with the same name already exists');
        }
      });
      socket.emit('newChannel', {
        name: nameChannel,
      });
    } catch (error) {
      console.log(error);
      return rejectWithValue('Failed to create channel');
    }
  }
);

export const sendRenameChannel = createAsyncThunk(
  '@@channel/rename-channel',
  async (
    { nameChannel, idChannel },
    { rejectWithValue, extra: { socket } }
  ) => {
    try {
      socket.emit('renameChannel', {
        name: nameChannel,
        id: idChannel,
      });
    } catch (error) {
      return rejectWithValue('Failed to rename channel');
    }
  }
);

export const deleteChannel = createAsyncThunk(
  '@@channel/delete-channel',
  async (idChannel, { rejectWithValue, extra: { socket } }) => {
    try {
      socket.emit('removeChannel', { id: idChannel });
    } catch (error) {
      return rejectWithValue('Failed to delete channel');
    }
  }
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
      console.log(action, 'rename');
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

        channels.forEach(
          (channel) =>
            (state.entities[channel.id] = { ...channel, messages: [] })
        );
        state.currentChannelId = currentChannelId;
      })
      .addCase(emitChannel.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(emitChannel.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.error.message;
      })
      .addCase(emitChannel.fulfilled, (state) => {
        state.status = 'fulfilled';
        state.error = null;
      });
  },
});

export const { selectActiveChat, addChannel, removeChannel, renameChannel } =
  channelsSlice.actions;

export default channelsSlice.reducer;
