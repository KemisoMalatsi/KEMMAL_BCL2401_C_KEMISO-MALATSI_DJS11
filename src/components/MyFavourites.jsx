import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { assets } from '../assets/assets';
import '../index.css';

const MyFavourites = () => {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
    setFavoriteEpisodes(storedFavorites);
  }, []);

  const removeFavorite = (episodeId) => {
    const updatedFavorites = favoriteEpisodes.filter((fav) => fav.id !== episodeId);
    setFavoriteEpisodes(updatedFavorites);
    localStorage.setItem('favoriteEpisodes', JSON.stringify(updatedFavorites));
  };

  if (!favoriteEpisodes.length) return <div>No favorite episodes available</div>;

  return (
    <div className="main-content">
      <h2>My Favourites</h2>
      <div className="episodes-grid">
        {favoriteEpisodes.map((episode, index) => (
          <div key={episode.id || index} className="episode-card">
            <h3>{episode.title}</h3>
            <p>{episode.description}</p>
            <audio controls>
              <source src={episode.file} />
              Your browser does not support the audio element.
            </audio>
            <FaHeart
              className="heart-icon favorite"
              onClick={() => removeFavorite(episode.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFavourites;
