import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets'; // Ensure this path is correct
import '../index.css';

const Sidebar = ({ handleSortAZ }) => {
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const goToHome = () => navigate('/');
  const goToPodcasts = () => navigate('/podcasts');
  const toggleSearchBar = () => setShowSearchBar(!showSearchBar);


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
          <div className='bottom-section-item'>
            <img className='bottom-section-icon-small' src={assets.arrow_icon} alt='Arrow' />
            <img className='bottom-section-icon-small' src={assets.plus_icon} alt='Plus' />
          </div>
          <div className='bottom-section-item' onClick={handleSortAZ}>
            {/* Ensure this item triggers the sorting function */}
            <img className='bottom-section-icon-small' src={assets.sort_icon} alt='Sort' />
            <p className='bottom-section-text'>Sort A-Z</p>
          </div>
        </div>
        <div className='playlist' >
          <h1>Create your first playlist</h1>
          <p className='playlist-light'>It's easy, we will help you</p>
          <button className='favourite-button'>Add to Favourites</button>
          <div className='bottom-section-item' onClick={handleSortAZ}>
            <button className='sort-a-button'>Sort A-Z</button>
          </div>
          <button className='sort-z-button'>Sort Z-A</button>
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
