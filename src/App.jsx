import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Podcasts from './components/Podcasts';
import Seasons from './components/Seasons';
import Episodes from './components/Episodes';
import MyFavourites from './components/MyFavourites';
import 'boxicons/css/boxicons.min.css'
import './index.css';

const App = () => {
  const [sortCriteria, setSortCriteria] = useState('az'); // Default sorting to 'az'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(''); // Ensure this line is included

  const handleSort = (sort) => {
    setSortCriteria(sort);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleGenreFilter = (genreId) => {
    setSelectedGenre(genreId);
  };

  return (
    <Router>
      <div className="app">
        <Sidebar handleSort={handleSort} handleSearch={handleSearch} handleGenreFilter={handleGenreFilter} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/podcasts" element={<Podcasts sortCriteria={sortCriteria} searchTerm={searchTerm} selectedGenre={selectedGenre} />} />
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
