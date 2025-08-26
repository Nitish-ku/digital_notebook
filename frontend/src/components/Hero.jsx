import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="text-center py-5 my-5">
      <Container>
        <h1 className="display-4 fw-bold">Your Digital Notebook, Reimagined</h1>
        <p className="lead text-muted mt-3">Capture your thoughts, ideas, and code in one beautiful and efficient space.</p>
        <Link to="/notebook">
          <Button variant="primary" size="lg" className="mt-4">Start Writing</Button>
        </Link>
      </Container>
    </div>
  );
};

export default Hero;
