import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import '../index.css';

const MyFavourites = ({ sortCriteria, genreFilter }) => {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
    setFavoriteEpisodes(storedFavorites);
  }, []);

  useEffect(() => {
    if (favoriteEpisodes.length > 0) {
      let sortedFavorites = [...favoriteEpisodes];

      // Apply sorting based on sortCriteria
      switch (sortCriteria) {
        case 'az':
          sortedFavorites.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'za':
          sortedFavorites.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'oldest':
          sortedFavorites.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
          break;
        case 'newest':
          sortedFavorites.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
          break;
        default:
          break;
      }

      // Apply genre filtering
      if (genreFilter) {
        sortedFavorites = sortedFavorites.filter(episode => episode.genres.includes(genreFilter));
      }

      setFavoriteEpisodes(sortedFavorites);
    }
  }, [sortCriteria, genreFilter]);

  const removeFavorite = (episode) => {
    const updatedFavorites = favoriteEpisodes.filter((fav) => fav.episodeId !== episode.episodeId);
    setFavoriteEpisodes(updatedFavorites);
    localStorage.setItem('favoriteEpisodes', JSON.stringify(updatedFavorites));
  };

  const handleEpisodeClick = (episode) => {
    navigate(`/seasons/${episode.showId}/episodes/${episode.seasonIndex}`, { state: { description: episode.description } });
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(); // Format date and time
  };

  const formatTime = (seconds) => {
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8); // HH:mm:ss format
  };

  if (!favoriteEpisodes.length) return <div>No favorite episodes available</div>;

  return (
    <div className="main-content">
      <h2>My Favourite Episodes</h2>
      <div className="episodes-grid">
        {favoriteEpisodes.map((episode, index) => (
          <div key={episode.episodeId || index} className="episode-card">
            <h3>{episode.title}</h3>
            <p>{episode.description}</p>
            <audio controls>
              <source src={episode.file} />
              Your browser does not support the audio element.
            </audio>
            <p>Added at: {formatDate(episode.addedAt)}</p>
            <p>Last listened at: {localStorage.getItem(`timestamp-${episode.episodeId}`) ? formatTime(localStorage.getItem(`timestamp-${episode.episodeId}`)) : 'Not started'}</p>
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
