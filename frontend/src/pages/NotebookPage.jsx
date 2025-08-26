import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotebookList from '../components/NotebookList';
import ChapterList from '../components/ChapterList';
import PageList from '../components/PageList';
import MainContent from '../components/MainContent';

const NotebookPage = () => {
  const [notebooks, setNotebooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [pages, setPages] = useState([]);
  const [selectedNotebookId, setSelectedNotebookId] = useState(null);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(null);

  useEffect(() => {
    fetchNotebooks();
  }, []);

  useEffect(() => {
    if (selectedNotebookId) {
      fetchChapters(selectedNotebookId);
    }
  }, [selectedNotebookId]);

  useEffect(() => {
    if (selectedChapterId) {
      fetchPages(selectedChapterId);
    }
  }, [selectedChapterId]);

  const fetchNotebooks = async () => {
    try {
      const res = await axios.get('/api/notebooks');
      if (Array.isArray(res.data)) {
        setNotebooks(res.data);
        if (res.data.length > 0) {
          setSelectedNotebookId(res.data[0]._id);
        }
      } else {
        setNotebooks([]);
      }
    } catch (err) {
      console.error('Error fetching notebooks:', err);
      setNotebooks([]);
    }
  };

  const fetchChapters = async (notebookId) => {
    try {
      const res = await axios.get(`/api/notebooks/${notebookId}/chapters`);
      setChapters(res.data);
      if (res.data.length > 0) {
        setSelectedChapterId(res.data[0]._id);
      }
    } catch (err) {
      console.error('Error fetching chapters:', err);
    }
  };

  const fetchPages = async (chapterId) => {
    try {
      const res = await axios.get(`/api/chapters/${chapterId}/pages`);
      setPages(res.data);
      if (res.data.length > 0) {
        setSelectedPageId(res.data[0]._id);
      }
    } catch (err) {
      console.error('Error fetching pages:', err);
    }
  };

  const handleAddNotebook = async (name) => {
    if (name) {
      try {
        const res = await axios.post('/api/notebooks', { name });
        setNotebooks([...notebooks, res.data]);
        setSelectedNotebookId(res.data._id);
      } catch (err) {
        console.error('Error adding notebook:', err);
      }
    }
  };

  const handleAddChapter = async (name) => {
    if (name && selectedNotebookId) {
      try {
        const res = await axios.post(`/api/notebooks/${selectedNotebookId}/chapters`, { name });
        setChapters([...chapters, res.data]);
        setSelectedChapterId(res.data._id);
      } catch (err) {
        console.error('Error adding chapter:', err);
      }
    }
  };

  const handleAddPage = async () => {
    const title = prompt('Enter page title:');
    if (title && selectedChapterId) {
      try {
        const res = await axios.post(`/api/chapters/${selectedChapterId}/pages`, { title, content: '' });
        setPages([...pages, res.data]);
        setSelectedPageId(res.data._id);
      } catch (err) {
        console.error('Error adding page:', err);
      }
    }
  };

  const handleSaveNote = async (content) => {
    if (selectedPageId) {
      try {
        await axios.put(`/api/pages/${selectedPageId}`, { content });
      } catch (err) {
        console.error('Error saving note:', err);
      }
    }
  };

  const selectedPage = pages.find(page => page._id === selectedPageId);

  return (
    <div className="notebook-layout">
      <div className="sidebar-column notebook-column">
        <NotebookList 
          notebooks={notebooks} 
          selectedNotebookId={selectedNotebookId}
          onSelectNotebook={setSelectedNotebookId} 
          onAddNotebook={handleAddNotebook} 
        />
      </div>
      <div className="sidebar-column chapter-column">
        <ChapterList 
          chapters={chapters} 
          selectedChapterId={selectedChapterId}
          onSelectChapter={setSelectedChapterId} 
          onAddChapter={handleAddChapter} 
        />
        <PageList 
          pages={pages} 
          selectedPageId={selectedPageId}
          onSelectPage={setSelectedPageId} 
          onAddPage={handleAddPage} 
        />
      </div>
      <div className="main-content-column">
        <MainContent 
          noteContent={selectedPage ? selectedPage.content : ''} 
          onSaveNote={handleSaveNote} 
        />
      </div>
    </div>
  );
};

export default NotebookPage;
