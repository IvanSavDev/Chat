import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Main from './Layout/Main';
import NotFoundPage from './Components/NotFoundPage';
import { Route, Routes, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Супер чат</Navbar.Brand>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Navigate to="login" replace />}></Route>
          <Route path="login" element={<Main />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
