import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotebookPage from './pages/NotebookPage';
import Footer from './components/Footer';
import { SignIn, SignUp, useAuth } from '@clerk/clerk-react';
import './App.css';

const PrivateRoute = ({ children }) => {
  const { isSignedIn } = useAuth();
  return isSignedIn ? children : <Navigate to="/sign-in" replace />;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in/*" element={<div className="clerk-centered-container"><SignIn routing="path" path="/sign-in" afterSignInUrl="/notebook" redirectUrl="/" /></div>} />
            <Route path="/sign-up/*" element={<div className="clerk-centered-container"><SignUp routing="path" path="/sign-up" afterSignUpUrl="/notebook" redirectUrl="/" /></div>} />
            <Route 
              path="/notebook" 
              element={
                <PrivateRoute>
                  <NotebookPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
