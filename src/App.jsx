import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Podcasts from './components/Podcasts';
import Seasons from './components/Seasons';
import Episodes from './components/Episodes';
import MyFavourites from './components/MyFavourites';
import './index.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term); // Update state with search term
    // Optionally, implement logic to filter podcasts based on search term
  };

  return (
    <Router>
      <div className="app">
        <Sidebar handleSearch={handleSearch} /> {/* Pass handleSearch as a prop */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/podcasts" element={<Podcasts searchTerm={searchTerm} />} /> {/* Pass searchTerm to Podcasts */}
            <Route path="/seasons/:showId" element={<Seasons />} />
            <Route path="/seasons/:showId/episodes/:seasonIndex" element={<Episodes />} />
            <Route path="/myfavourites" element={<MyFavourites />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
