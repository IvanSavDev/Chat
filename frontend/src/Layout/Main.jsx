import { Container } from 'react-bootstrap';
import Authorization from '../components/Chat/Authorization';
import NotFoundPage from '../components/Chat/NotFoundPage';
import { Route, Routes } from 'react-router-dom';
import AuthRequire from '../hoc/AuthRequire';
import Chat from '../components/Chat/Chat';
import Registration from '../components/Chat/Registration/Registration';
import AuthRegistration from '../hoc/AuthRegistration';

const Main = () => {
  return (
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
};

export default Main;
