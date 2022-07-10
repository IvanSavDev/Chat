import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import Main from '../layout/Main';
import Authorization from './Authorization';
import NotFoundPage from './NotFoundPage';
import { Route, Routes, Link } from 'react-router-dom';
import AuthProvider from '../hoc/AuthProvider';
import AuthRequire from '../hoc/AuthRequire';
import Chat from './Chat';

const App = () => {
  return (
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Супер чат
            </Navbar.Brand>
          </Container>
        </Navbar>
        <div className="container-fluid h-100">
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
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;
