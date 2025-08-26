import React, { useState } from 'react';
import { ListGroup, Button, Form } from 'react-bootstrap';

const ChapterList = ({ chapters, selectedChapterId, onSelectChapter, onAddChapter }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddChapter(name);
    setName('');
    setShowForm(false);
  };

  return (
    <div className="p-3">
      <h4>Chapters</h4>
      <ListGroup variant="flush">
        {chapters.map(chapter => (
          <ListGroup.Item 
            action 
            active={chapter._id === selectedChapterId}
            onClick={() => onSelectChapter(chapter._id)} 
            key={chapter._id}
          >
            {chapter.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
      {showForm ? (
        <Form onSubmit={handleSubmit} className="add-item-form">
          <Form.Group>
            <Form.Control 
              type="text" 
              placeholder="Enter chapter name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2 w-100">Add</Button>
          <Button variant="secondary" onClick={() => setShowForm(false)} className="mt-2 w-100">Cancel</Button>
        </Form>
      ) : (
        <Button variant="primary" className="w-100 mt-3 btn-chapter" onClick={() => setShowForm(true)}>Add Chapter</Button>
      )}
    </div>
  );
};

export default ChapterList;
