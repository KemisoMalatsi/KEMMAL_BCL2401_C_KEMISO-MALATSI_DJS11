
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Podcasts from './components/Podcasts';
import Seasons from './components/Seasons';
import Episodes from './components/Episodes';
import './index.css';

const App = () => (
  <Router>
    <div className="app">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/seasons/:showId" element={<Seasons />} />
          <Route path="/seasons/:showId/episodes/:seasonIndex" element={<Episodes />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
