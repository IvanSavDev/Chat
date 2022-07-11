import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channels/channels-slice';
import messagesReducer from './messages/messages-slice';
import statusReducer from './loadStartData/data-slice';
import routes from '../routes';
import axios from 'axios';

import io from '../../node_modules/socket.io/client-dist/socket.io.js';

const socket = io();
console.log(socket);

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    status: statusReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          axios,
          routes,
          socket,
        },
      },
    }),
});

export default store;
