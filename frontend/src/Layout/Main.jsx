import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Authorization from '../Components/Chat/Authorization';
import NotFoundPage from '../Components/Chat/NotFoundPage';
import AuthRequire from '../Hoc/AuthRequire';
import Chat from '../Components/Chat/Chat';
import Registration from '../Components/Chat/Registration/Registration';
import AuthRegistration from '../Hoc/AuthRegistration';

const Main = () => (
    <Container className="h-100 m-3 overflow-hidden align-self-center">
      <Routes>
        <Route
          path="/"
          element={
            <AuthRequire>
              <Chat></Chat>
            </AuthRequire>
          }
        ></Route>
        <Route path="/login" element={<Authorization />} />
        <Route
          path="/signup"
          element={
            <AuthRegistration>
              <Registration />
            </AuthRegistration>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Container>
);

export default Main;
