import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

const PageList = ({ pages, selectedPageId, onSelectPage, onAddPage }) => {
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
      <Button variant="outline-primary" className="w-100 mt-3 btn-page" onClick={onAddPage}>Add Page</Button>
    </div>
  );
};

export default PageList;
