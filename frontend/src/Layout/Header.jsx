import React, { useContext } from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { logOut, loggedIn } = useContext(AuthContext);
  return (
    <Navbar bg="light" expand="lg" className="border">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Супер чат
        </Navbar.Brand>
        {loggedIn && (
          <Button as={Link} to="/" variant="info" onClick={logOut}>
            Выйти
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
