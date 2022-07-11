import { Button, Navbar, Container } from 'react-bootstrap';
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
        <Navbar bg="light" expand="lg" className="border">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Супер чат
            </Navbar.Brand>
            <Button variant="info">Выйти</Button>
          </Container>
        </Navbar>
        <Container className="h-100 d-flex flex-column justify-content-center">
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
      </div>
    </AuthProvider>
  );
};

export default App;
