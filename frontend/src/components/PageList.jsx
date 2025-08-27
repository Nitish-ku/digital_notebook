import React, { useState } from 'react';
import { ListGroup, Button, Form } from 'react-bootstrap';

const PageList = ({ pages, selectedPageId, onSelectPage, onAddPage }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPage(title);
    setTitle('');
    setShowForm(false);
  };

  return (
    <div className="p-3">
      <h5>Pages</h5>
      <ListGroup variant="flush">
        {pages.map(page => (
          <ListGroup.Item
            action
            active={page._id === selectedPageId}
            onClick={() => onSelectPage(page._id)}
            key={page._id}
          >
            {page.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
      {showForm ? (
        <Form onSubmit={handleSubmit} className="add-item-form">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter page title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2 w-100">Add</Button>
          <Button variant="secondary" onClick={() => setShowForm(false)} className="mt-2 w-100">Cancel</Button>
        </Form>
      ) : (
        <Button variant="outline-primary" className="w-100 mt-3 btn-page" onClick={() => setShowForm(true)}>Add Page</Button>
      )}
    </div>
  );
};

export default PageList;