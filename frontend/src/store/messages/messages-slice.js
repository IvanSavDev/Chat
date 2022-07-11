import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { getDataChat, resetData } from '../loadStartData/data-slice';

const initialState = {
  entities: {},
  ids: [],
  status: 'fulfilled',
};

export const sendMessage = createAsyncThunk(
  '@@message/send-message',
  async (message, { getState, extra: { socket } }) => {
    const channelId = getState().channels.currentChannelId;

    console.log(socket);
    socket.emit(
      'newMessage',
      {
        body: message,
        username: 'admin',
        channelId,
      },
      (response) => {
        console.log(response.status);
      }
    );
  }
);

export const subscribeMesseage = createAsyncThunk(
  '@@message/subscribe-mesages',
  async (_, { getState, dispatch, extra: { socket } }) => {
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });
  }
);

const messagesSlice = createSlice({
  name: '@@chat/channels-data',
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
      .addCase(resetData, (state) => {
        state = initialState;
      })
      .addCase(sendMessage.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'rejected';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'fulfilled';
      });
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
