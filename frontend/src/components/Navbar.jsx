import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const AppNavbar = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">Digital Notebook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <SignedIn>
              <Nav.Link as={Link} to="/notebook">Notebook</Nav.Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Nav.Link as={Link} to="/sign-in">Login</Nav.Link>
              <Button as={Link} to="/sign-up" variant="primary" className="ms-lg-2">Sign Up</Button>
            </SignedOut>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

