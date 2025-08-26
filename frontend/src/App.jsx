import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotebookPage from './pages/NotebookPage';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/notebook" element={<NotebookPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
