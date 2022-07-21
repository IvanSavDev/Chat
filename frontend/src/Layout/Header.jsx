import React from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="border">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Супер чат
        </Navbar.Brand>
        <Button variant="info">Выйти</Button>
      </Container>
    </Navbar>
  );
};

export default Header;
