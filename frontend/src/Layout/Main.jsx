import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Authorization from '../Components/Chat/Authorization';
import NotFoundPage from '../Components/Chat/NotFoundPage';
import AuthRequire from '../hoc/AuthRequire';
import Chat from '../Components/Chat/Chat';
import RegistrationForm from '../Components/Chat/Registration';
import AuthRegistration from '../hoc/AuthRegistration';

const Main = () => (
  <Container className="h-100 overflow-hidden d-flex justify-content-center py-4">
    <Routes>
      <Route
        path="/"
        element={(
          <AuthRequire>
            <Chat />
          </AuthRequire>
        )}
      />
      <Route path="/login" element={<Authorization />} />
      <Route
        path="/signup"
        element={(
          <AuthRegistration>
            <RegistrationForm />
          </AuthRegistration>
        )}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Container>
);

export default Main;
