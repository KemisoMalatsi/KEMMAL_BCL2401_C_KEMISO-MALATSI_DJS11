// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Podcasts from './components/Podcasts';
import Seasons from './components/Seasons';
import Episodes from './components/Episodes';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/seasons/:showId" element={<Seasons />} />
            <Route path="/podcast/:podcastId/seasons/:seasonId" component={Episodes} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
