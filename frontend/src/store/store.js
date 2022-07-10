import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channels/channels-slice';
import messagesReducer from './messages/messages-slice';
import statusReducer from './loadStartData/data-slice';
import routes from '../routes';
import axios from 'axios';

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
        },
      },
    }),
});

export default store;
