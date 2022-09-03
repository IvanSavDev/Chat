import React from 'react';
import axios from 'axios';
import i18next from 'i18next';
import { BrowserRouter } from 'react-router-dom';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-relative-packages
import { io } from '../node_modules/socket.io/client-dist/socket.io';
import messagesReducer, { addMessage } from './slices/messages-slice';
import modalsSlice from './slices/modals-slice';
import channelsReducer, {
  addChannel,
  renameChannel,
  removeChannel,
  selectActiveChat,
} from './slices/channels-slice';
import locales from './locales/index';
import routes from './routes';
import App from './Components/App';

const InitialState = async () => {
  const i18n = i18next.createInstance();

  const currentLanguage = localStorage.getItem('language') || 'ru';

  await i18n.use(initReactI18next).init({
    fallbackLng: currentLanguage.toLowerCase(),
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
      modals: modalsSlice,
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
