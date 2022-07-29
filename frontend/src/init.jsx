import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import axios from 'axios';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import locales from './locales/index';
// eslint-disable-next-line import/no-relative-packages
import { io } from '../node_modules/socket.io/client-dist/socket.io';
import channelsReducer, {
  addChannel,
  renameChannel,
  removeChannel,
  selectActiveChat,
} from './slices/channels-slice';
import messagesReducer, { addMessage } from './slices/messages-slice';
import statusReducer from './slices/data-slice';
import routes from './routes';
import App from './Components/App';

const InitialState = async () => {
  const i18n = i18next.createInstance();

  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);

  await i18n.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ...locales,
    },
  });

  const socket = io();

  const store = configureStore({
    reducer: {
      channels: channelsReducer,
      messages: messagesReducer,
      statusAuthorization: statusReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: {
          axios,
          routes,
          socket,
        },
      },
    }),
  });

  socket.on('removeChannel', ({ id }) => {
    const { channels } = store.getState();
    const generalChannelId = channels.ids.find(
      (idChannel) => channels.entities[idChannel].name === 'general',
    );
    store.dispatch(removeChannel(id));
    store.dispatch(selectActiveChat(generalChannelId));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
    store.dispatch(selectActiveChat(payload.id));
  });

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default InitialState;
