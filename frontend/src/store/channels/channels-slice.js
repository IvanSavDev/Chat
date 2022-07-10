import { createSlice, nanoid } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';

import { getDataChat, resetData } from '../loadStartData/data-slice';

const initialState = {
  entities: {},
  ids: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: '@@chat/channels-data',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      state.entities.push({ ...action.payload, id: nanoid() });
      state.ids.push(action.payload.id);
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
      .addCase(resetData, (state) => {
        state = initialState;
      });
  },
});

export default channelsSlice.reducer;
