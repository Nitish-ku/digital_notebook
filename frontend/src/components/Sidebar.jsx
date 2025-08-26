import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const Sidebar = ({ notes, onSelectNote, onAddNote, onDeleteNote }) => {
  return (
    <div className="bg-light border-right" style={{ width: '280px', height: '100vh', position: 'fixed', paddingTop: '20px' }}>
      <h4 className="px-3">Notebooks</h4>
      <ListGroup variant="flush">
        {notes.map(note => (
          <ListGroup.Item 
            action 
            onClick={() => onSelectNote(note._id)} 
            key={note._id} 
            className="d-flex justify-content-between align-items-center"
          >
            {note.title}
            <Button variant="danger" size="sm" onClick={(e) => {
              e.stopPropagation(); // Prevent selecting the note when deleting
              onDeleteNote(note._id);
            }}>
              <FaTrash />
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className="px-3 mt-3">
        <Button variant="primary" className="w-100" onClick={onAddNote}>Add New Note</Button>
      </div>
    </div>
  );
};

export default Sidebar;
