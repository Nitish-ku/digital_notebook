import React from 'react';
import { ListGroup } from 'react-bootstrap';

const PageList = ({ pages, onSelectPage }) => {
  return (
    <div className="p-3">
      <h5>Pages</h5>
      <ListGroup variant="flush">
        {pages.map(page => (
          <ListGroup.Item action onClick={() => onSelectPage(page._id)} key={page._id}>
            {page.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default PageList;
