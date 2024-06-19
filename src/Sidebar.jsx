import React from 'react';
import { assets } from '../src/assets/assets';
import './index.css'; 

const Sidebar = () => {
  return (
    <div className='sidebar sidebar-lg'>
      <div className='top-section'>
        <div className='top-section-item'>
          <img className='top-section-icon' src={assets.home_icon} alt='' />
          <p className='top-section-text'>Home</p>
        </div>
        <div className='top-section-item'>
          <img className='top-section-icon' src={assets.search_icon} alt='' />
          <p className='top-section-text'>Search</p>
        </div>
      </div>
      <div className='bottom-section'>
        <div className='bottom-section-content'>
          <div className='bottom-section-item'>
            <img className='bottom-section-icon-large' src={assets.stack_icon} alt='' />
            <p className='bottom-section-text'>Your Library</p>
          </div>
          <div className='bottom-section-item'>
            <img className='bottom-section-icon-small' src={assets.arrow_icon} alt='' />
            <img className='bottom-section-icon-small' src={assets.plus_icon} alt='' />
          </div>
        </div>
        <div className='playlist'>
          <h1>Create your first playlist</h1>
          <p className='playlist-light'>It's easy, we will help you</p>
          <button className='playlist-button'>Create Playlist</button>
        </div>
        <div className='playlist mt-4'>
          <h1>Let's find some podcasts to follow</h1>
          <p className='playlist-light'>We'll keep you updated on new episodes</p>
          <button className='playlist-button'>Browse Podcasts</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
