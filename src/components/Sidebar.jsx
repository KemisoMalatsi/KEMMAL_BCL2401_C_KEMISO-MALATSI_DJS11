import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import '../index.css';

const Sidebar = ({ handleSort }) => {
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const goToHome = () => navigate('/');
  const goToPodcasts = () => navigate('/podcasts');
  const toggleSearchBar = () => setShowSearchBar(!showSearchBar);

  const handleSortChange = (event) => {
    handleSort(event.target.value);
  };

  return (
    <div className='sidebar sidebar-lg'>
      <div className='top-section'>
        <div className='top-section-item' onClick={goToHome}>
          <img className='top-section-icon' src={assets.home_icon} alt='Home' />
          <p className='top-section-text'>Home</p>
        </div>
        <div className='top-section-item' onClick={toggleSearchBar}>
          <img className='top-section-icon' src={assets.search_icon} alt='Search' />
          <p className='top-section-text'>Search</p>
        </div>
        {showSearchBar && (
          <div className='search-bar'>
            <input type='text' placeholder='Search...' className='search-input' />
          </div>
        )}
      </div>
      <div className='bottom-section'>
        <div className='bottom-section-content'>
          <div className='bottom-section-item' onClick={goToPodcasts}>
            <img className='bottom-section-icon-large' src={assets.stack_icon} alt='Podcasts' />
            <p className='bottom-section-text'>Your Podcasts</p>
          </div>
        </div>
        <div className='sort-section'>
          <label htmlFor='sort-dropdown' className='sort-label'>Sort by:</label>
          <select id='sort-dropdown' className='sort-dropdown' onChange={handleSortChange}>
            <option value='az'>Sort A-Z</option>
            <option value='za'>Sort Z-A</option>
            <option value='oldest'>Oldest to Newest</option>
            <option value='newest'>Newest to Oldest</option>
            <option value='genres'>Genres</option>
          </select>
        </div>
        <div className='playlist'>
          <h1>Create your first playlist</h1>
          <p className='playlist-light'>It's easy, we will help you</p>
          <button className='favourite-button'>My Favourites</button>
        </div>
        <div className='playlist mt-4'>
          <h1>Let's find some podcasts to follow</h1>
          <p className='playlist-light'>We'll keep you updated on new episodes</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;