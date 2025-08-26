import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Features = () => {
  return (
    <div className="bg-light py-5">
      <Container>
        <h2 className="text-center mb-5">Features</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body>
                <Card.Title as="h3" className="mb-3">Rich Text Editing</Card.Title>
                <Card.Text className="text-muted">
                  Format your notes with a powerful, Notion-like editor.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body>
                <Card.Title as="h3" className="mb-3">Code Blocks</Card.Title>
                <Card.Text className="text-muted">
                  Embed and highlight code snippets with ease.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body>
                <Card.Title as="h3" className="mb-3">Organize Everything</Card.Title>
                <Card.Text className="text-muted">
                  Create notebooks and pages to structure your thoughts.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Features;
