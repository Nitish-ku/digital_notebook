import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

const ChapterList = ({ chapters, onSelectChapter, onAddChapter }) => {
  return (
    <div className="bg-light border-right p-3">
      <h4>Chapters</h4>
      <ListGroup variant="flush">
        {chapters.map(chapter => (
          <ListGroup.Item action onClick={() => onSelectChapter(chapter._id)} key={chapter._id}>
            {chapter.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant="primary" className="w-100 mt-3" onClick={onAddChapter}>Add Chapter</Button>
    </div>
  );
};

export default ChapterList;
