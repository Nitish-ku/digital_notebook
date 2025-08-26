import React, { useState } from 'react';
import { ListGroup, Button, Form } from 'react-bootstrap';

const NotebookList = ({ notebooks, selectedNotebookId, onSelectNotebook, onAddNotebook }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNotebook(name);
    setName('');
    setShowForm(false);
  };

  return (
    <div className="p-3">
      <h4>Notebooks</h4>
      <ListGroup variant="flush">
        {notebooks.map(notebook => (
          <ListGroup.Item 
            action 
            active={notebook._id === selectedNotebookId}
            onClick={() => onSelectNotebook(notebook._id)} 
            key={notebook._id}
          >
            {notebook.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
      {showForm ? (
        <Form onSubmit={handleSubmit} className="add-item-form">
          <Form.Group>
            <Form.Control 
              type="text" 
              placeholder="Enter notebook name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2 w-100">Add</Button>
          <Button variant="secondary" onClick={() => setShowForm(false)} className="mt-2 w-100">Cancel</Button>
        </Form>
      ) : (
        <Button variant="primary" className="w-100 mt-3 btn-notebook" onClick={() => setShowForm(true)}>Add Notebook</Button>
      )}
    </div>
  );
};

export default NotebookList;
