import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { getDataChat, resetData } from '../loadStartData/data-slice';
import { removeChannel } from '../channels/channels-slice';

const initialState = {
  entities: {},
  ids: [],
  status: 'fulfilled',
  error: null,
};

export const emitMessage = createAsyncThunk(
  '@@message/send-message',
  async (message, { getState, rejectWithValue, extra: { socket } }) => {
    try {
      const channelId = getState().channels.currentChannelId;
      socket.emit('newMessage', {
        body: message,
        username: 'admin',
        channelId,
      });
    } catch {
      return rejectWithValue('Failed to send message');
    }
  }
);

export const subscribeMesseage = createAsyncThunk(
  '@@message/subscribe-mesages',
  async (_, { dispatch, extra: { socket } }) => {
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });
  }
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
        messages.forEach(
          (message) => (state.entities[message.id] = { ...message })
        );
      })
      .addCase(removeChannel, (state, { payload }) => {
        const currentEntities = state.entities;
        state.ids.forEach((id) => {
          if (currentEntities[id].channelId === payload) {
            delete currentEntities[id];
          }
        });
        state.ids = Object.keys(currentEntities);
      })
      .addCase(resetData, (state) => {
        state = initialState;
      })
      .addCase(emitMessage.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(emitMessage.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.error.message;
      })
      .addCase(emitMessage.fulfilled, (state) => {
        state.status = 'fulfilled';
        state.error = null;
      });
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
