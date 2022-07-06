import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Main from './layout/Main';
import NotFoundPage from './components/NotFoundPage';
import { Route, Routes, Link } from 'react-router-dom';
import AuthProvider from './hoc/AuthProvider';
import AuthRequire from './hoc/AuthRequire';

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
        <Routes>
          <Route
            path="/"
            element={
              <AuthRequire>
                <p>вы автаризованы</p>
              </AuthRequire>
            }
          ></Route>
          <Route path="/login" element={<Main />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
