import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const NotebookPage = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('/api/notes');
        if (Array.isArray(res.data)) { // Ensure data is an array
          setNotes(res.data);
          if (res.data.length > 0) {
            setSelectedNoteId(res.data[0]._id);
          }
        } else {
          console.error('API response is not an array:', res.data);
          setNotes([]); // Reset notes to empty array if response is not valid
        }
      } catch (err) {
        console.error('Error fetching notes:', err);
        setNotes([]); // Reset notes to empty array on error
      }
    };
    fetchNotes();
  }, []);

  const selectedNote = Array.isArray(notes) ? notes.find(note => note._id === selectedNoteId) : undefined;

  const handleSelectNote = (id) => {
    setSelectedNoteId(id);
  };

  const handleAddNote = async () => {
    try {
      const res = await axios.post('/api/notes', { title: 'New Note', content: '<p>Start writing...</p>' });
      setNotes([...notes, res.data]);
      setSelectedNoteId(res.data._id);
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  const handleSaveNote = async (content) => {
    if (selectedNote) {
      try {
        const res = await axios.put(`/api/notes/${selectedNote._id}`, { ...selectedNote, content });
        setNotes(notes.map(note => (note._id === selectedNote._id ? res.data : note)));
      } catch (err) {
        console.error('Error saving note:', err);
      }
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
      if (selectedNoteId === id) {
        setSelectedNoteId(notes[0]?._id || null);
      }
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="p-0">
          <Sidebar notes={notes} onSelectNote={handleSelectNote} onAddNote={handleAddNote} onDeleteNote={handleDeleteNote} />
        </Col>
        <Col xs={10} className="p-0">
          <MainContent noteContent={selectedNote ? selectedNote.content : ''} onSaveNote={handleSaveNote} />
        </Col>
      </Row>
    </Container>
  );
};

export default NotebookPage;
