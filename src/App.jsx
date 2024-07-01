import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Podcasts from './components/Podcasts';
import Seasons from './components/Seasons';
import Episodes from './components/Episodes';
import './index.css';

const App = () => {
  const [sortCriteria, setSortCriteria] = useState('az'); // Initial sort criteria

  const handleSort = (criteria) => {
    setSortCriteria(criteria); // Update sort criteria state
  };

  return (
    <Router>
      <div className="app">
        <Sidebar handleSort={handleSort} /> {/* Pass handleSort as prop */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/podcasts" element={<Podcasts sortCriteria={sortCriteria} />} />
            <Route path="/seasons/:showId" element={<Seasons />} />
            <Route path="/seasons/:showId/episodes/:seasonIndex" element={<Episodes />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
