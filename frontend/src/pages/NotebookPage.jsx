import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import NotebookList from '../components/NotebookList';
import ChapterList from '../components/ChapterList';
import PageList from '../components/PageList';
import MainContent from '../components/MainContent';
import useMediaQuery from '../utils/useMediaQuery';

const NotebookPage = () => {
  const [notebooks, setNotebooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [pages, setPages] = useState([]);
  const [selectedNotebookId, setSelectedNotebookId] = useState(null);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(null);
  
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [isNotebookColumnCollapsed, setNotebookColumnCollapsed] = useState(isMobile);
  const [isChapterColumnCollapsed, setChapterColumnCollapsed] = useState(true);

  const fetchNotebooks = useCallback(async () => {
    try {
      const res = await axios.get('/api/notebooks');
      if (Array.isArray(res.data)) {
        setNotebooks(res.data);
      } else {
        setNotebooks([]);
      }
    } catch (err) {
      console.error('Error fetching notebooks:', err);
      setNotebooks([]);
    }
  }, []);

  const fetchChapters = useCallback(async (notebookId) => {
    try {
      const res = await axios.get(`/api/notebooks/${notebookId}/chapters`);
      if (Array.isArray(res.data)) {
        setChapters(res.data);
      } else {
        setChapters([]);
      }
    } catch (err) {
      console.error('Error fetching chapters:', err);
      setChapters([]);
    }
  }, []);

  const fetchPages = useCallback(async (chapterId) => {
    try {
      const res = await axios.get(`/api/chapters/${chapterId}/pages`);
      if (Array.isArray(res.data)) {
        setPages(res.data);
      } else {
        setPages([]);
      }
    } catch (err) {
      console.error('Error fetching pages:', err);
      setPages([]);
    }
  }, []);

  useEffect(() => {
    fetchNotebooks();
  }, [fetchNotebooks]);

  useEffect(() => {
    if (selectedNotebookId) {
      fetchChapters(selectedNotebookId);
      setChapterColumnCollapsed(false);
      setSelectedChapterId(null);
      setPages([]);
      setSelectedPageId(null);
    } else {
      setChapters([]);
      setPages([]);
      setChapterColumnCollapsed(true);
    }
  }, [selectedNotebookId, fetchChapters]);

  useEffect(() => {
    if (selectedChapterId) {
      fetchPages(selectedChapterId);
      setSelectedPageId(null);
    } else {
      setPages([]);
    }
  }, [selectedChapterId, fetchPages]);

  useEffect(() => {
    setNotebookColumnCollapsed(isMobile);
    if (!isMobile) {
      setChapterColumnCollapsed(false);
    }
  }, [isMobile]);

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

  const handleAddPage = async (title) => {
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

  const toggleNotebookColumn = () => {
    setNotebookColumnCollapsed(!isNotebookColumnCollapsed);
    if (!isNotebookColumnCollapsed) {
      setChapterColumnCollapsed(true);
    }
  }

  const toggleChapterColumn = () => {
    setChapterColumnCollapsed(!isChapterColumnCollapsed);
    if (!isChapterColumnCollapsed) {
      setNotebookColumnCollapsed(true);
    }
  }

  let mainContentDisplay;
  if (!selectedNotebookId) {
    mainContentDisplay = <div className="text-center p-5 text-muted">Select a notebook to get started.</div>;
  } else if (!selectedChapterId) {
    mainContentDisplay = <div className="text-center p-5 text-muted">Select a chapter or add a new one.</div>;
  } else if (!selectedPageId) {
    mainContentDisplay = <div className="text-center p-5 text-muted">Select a page or add a new one.</div>;
  } else {
    mainContentDisplay = (
      <MainContent 
        noteContent={selectedPage ? selectedPage.content : ''} 
        onSaveNote={handleSaveNote} 
      />
    );
  }

  return (
    <div className="notebook-layout">
      <div className="sidebar-toggle-buttons">
        <button className="btn btn-primary m-2" onClick={toggleNotebookColumn}>
          {isNotebookColumnCollapsed ? 'Show Notebooks' : 'Hide Notebooks'}
        </button>
        {selectedNotebookId && (
          <button className="btn btn-secondary m-2" onClick={toggleChapterColumn}>
            {isChapterColumnCollapsed ? 'Show Chapters' : 'Hide Chapters'}
          </button>
        )}
      </div>

      <div className={`sidebar-column notebook-column ${isNotebookColumnCollapsed ? 'collapsed' : ''}`}>
        <NotebookList 
          notebooks={notebooks} 
          selectedNotebookId={selectedNotebookId}
          onSelectNotebook={(id) => {
            setSelectedNotebookId(id);
            if (isMobile) {
              setNotebookColumnCollapsed(true);
              setChapterColumnCollapsed(false);
            }
          }} 
          onAddNotebook={handleAddNotebook} 
        />
      </div>
      <div className={`sidebar-column chapter-column ${isChapterColumnCollapsed ? 'collapsed' : ''}`}>
        <ChapterList 
          chapters={chapters} 
          selectedChapterId={selectedChapterId}
          onSelectChapter={(id) => {
            setSelectedChapterId(id);
            if (isMobile) {
              setChapterColumnCollapsed(true);
            }
          }} 
          onAddChapter={handleAddChapter} 
        />
        <PageList 
          pages={pages} 
          selectedPageId={selectedPageId}
          onSelectPage={(id) => {
            setSelectedPageId(id);
            if (isMobile) {
              setChapterColumnCollapsed(true);
            }
          }} 
          onAddPage={handleAddPage} 
        />
      </div>
      <div className="main-content-column">
        {mainContentDisplay}
      </div>
    </div>
  );
};

export default NotebookPage;
