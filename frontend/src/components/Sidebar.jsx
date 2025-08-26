import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

const NotebookList = ({ notebooks, onSelectNotebook, onAddNotebook }) => {
  return (
    <div className="bg-light border-right p-3">
      <h4>Notebooks</h4>
      <ListGroup variant="flush">
        {notebooks.map(notebook => (
          <ListGroup.Item action onClick={() => onSelectNotebook(notebook._id)} key={notebook._id}>
            {notebook.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant="primary" className="w-100 mt-3" onClick={onAddNotebook}>Add Notebook</Button>
    </div>
  );
};

export default NotebookList;
