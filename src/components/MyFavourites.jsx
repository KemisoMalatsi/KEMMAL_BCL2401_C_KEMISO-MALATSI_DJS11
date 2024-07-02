import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import '../index.css';

const MyFavourites = () => {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
    setFavoriteEpisodes(storedFavorites);
  }, []);

  const removeFavorite = (episode) => {
    const updatedFavorites = favoriteEpisodes.filter((fav) => fav.id !== episode.id);
    setFavoriteEpisodes(updatedFavorites);
    localStorage.setItem('favoriteEpisodes', JSON.stringify(updatedFavorites));
  };

  const handleEpisodeClick = (episode) => {
    navigate(`/seasons/${episode.showId}`, { state: { description: episode.description } });
  };

  if (!favoriteEpisodes.length) return <div>No favorite episodes available</div>;

  return (
    <div className="main-content">
      <h2>My Favourite Episodes</h2>
      <div className="episodes-grid">
        {favoriteEpisodes.map((episode, index) => (
          <div key={episode.episode || index} className="episode-card">
            <h3>{episode.title}</h3>
            <p>{episode.description}</p>
            <audio controls>
              <source src={episode.file} />
              Your browser does not support the audio element.
            </audio>
            <FaTrash
              className="trash-icon"
              onClick={() => removeFavorite(episode)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFavourites;
