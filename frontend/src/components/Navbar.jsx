import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const AppNavbar = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg" className="border-bottom">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Digital Notebook
        </Navbar.Brand>

        {/* Toggle for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <SignedIn>
              <Nav.Link as={Link} to="/notebook">Notebook</Nav.Link>
            </SignedIn>
          </Nav>

          {/* Right side (Auth buttons / User button) */}
          <div className="d-flex align-items-center">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Nav.Link as={Link} to="/sign-in" className="me-2">Login</Nav.Link>
              <Button as={Link} to="/sign-up" variant="primary">Sign Up</Button>
            </SignedOut>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
