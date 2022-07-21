import { Container } from 'react-bootstrap';
import Authorization from '../components/Chat/Authorization';
import NotFoundPage from '../components/Chat/NotFoundPage';
import { Route, Routes } from 'react-router-dom';
import AuthRequire from '../hoc/AuthRequire';
import Chat from '../components/Chat/Chat';

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
        <Route path="/login" element={<Authorization />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </Container>
  );
};

export default Main;
