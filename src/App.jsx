import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Podcasts from './components/Podcasts';
import Seasons from './components/Seasons';
import Episodes from './components/Episodes';

const App = () => (
  <Router>
    <div className="app">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/podcasts" element={<Podcasts />} />
        <Route path="/seasons/:showId" element={<Seasons />} />
        <Route path="/shows/:seasonId" element={<Episodes />} />
      </Routes>
    </div>
  </Router>
);

export default App;
