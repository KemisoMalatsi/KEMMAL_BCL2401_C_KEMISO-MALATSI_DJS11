import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';
import 'boxicons/css/boxicons.min.css'
import '../index.css';

const Sidebar = ({ handleSort, handleSearch, handleGenreFilter }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false); // New state for sidebar visibility

  const genresMapping = {
    1: 'Personal Growth',
    2: 'Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family'
  };

  useEffect(() => {
    // Show search bar only when on the Podcasts page
    setShowSearchBar(location.pathname === '/podcasts');
  }, [location.pathname]);

  const goToHome = () => navigate('/');
  const goToPodcasts = () => navigate('/podcasts');

  const handleSortChange = (event) => {
    handleSort(event.target.value); // Pass selected sort value to parent component
  };

  const handleSearchChange = (event) => {
    const term = event.target.value; // Get search input value
    setSearchTerm(term); // Update local state with search term
    handleSearch(term); // Pass search term to parent component
  };

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId); // Update selected genre state
    handleGenreFilter(genreId); // Trigger filter by genre in parent component
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  return (
    <>
      <div className='menu-icon' onClick={toggleSidebar}>
        <box-icon name='menu'></box-icon>
      </div>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''} sidebar-lg`}>
        {/* Top Section */}
        <div className='top-section'>
          <div className='top-section-item' onClick={goToHome}>
            <img className='top-section-icon' src={assets.home_icon} alt='Home' />
            <p className='top-section-text'>Home</p>
          </div>
          {showSearchBar && (
            <div className='top-section-item' onClick={() => setShowSearchBar(!showSearchBar)}>
              <img className='top-section-icon' src={assets.search_icon} alt='Search' />
              <p className='top-section-text'>Search</p>
            </div>
          )}
          {showSearchBar && (
            <div className='search-bar'>
              <input
                type='text'
                placeholder='Search...'
                className='search-input'
                value={searchTerm}
                onChange={handleSearchChange} // Call handleSearchChange on input change
              />
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className='bottom-section'>
          {/* Podcasts Section */}
          <div className='bottom-section-content'>
            <div className='bottom-section-item' onClick={goToPodcasts}>
              <img className='bottom-section-icon-large' src={assets.stack_icon} alt='Podcasts' />
              <p className='bottom-section-text'>Your Podcasts</p>
            </div>
          </div>

          {/* Sort Section */}
          <div className='sort-section'>
            <label htmlFor='sort-dropdown' className='sort-label'>Sort by:</label>
            <select id='sort-dropdown' className='sort-dropdown' onChange={handleSortChange}>
              <option value='az'>Sort A-Z</option>
              <option value='za'>Sort Z-A</option>
              <option value='oldest'>Oldest to Newest</option>
              <option value='newest'>Newest to Oldest</option>
            </select>

            <label htmlFor='genre-dropdown' className='sort-label'>Genres:</label>
            <select id='genre-dropdown' className='sort-dropdown' onChange={handleGenreChange}>
              <option value=''>All Genres</option>
              {Object.entries(genresMapping).map(([id, title]) => (
                <option key={id} value={id}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          {/* Playlist Sections */}
          <div className='playlist'>
            <h1>Create your first playlist</h1>
            <p className='playlist-light'>It's easy, we will help you</p>
            <button className='favourite-button' onClick={() => navigate('/myfavourites')}>
              My Favourites
            </button>
          </div>
          <div className='playlist mt-4'>
            <h1>Let's find some podcasts to follow</h1>
            <p className='playlist-light'>We'll keep you updated on new episodes</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
