import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyFavourites = () => {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
    setFavoriteEpisodes(storedFavorites);
  }, []);

  const handleEpisodeClick = (episode) => {
    navigate(`/seasons/${episode.showId}`, { state: { description: episode.description } });
  };

  if (!favoriteEpisodes.length) return <div>No favorite episodes available</div>;

  return (
    <div className="main-content">
      <h1 className='my-favourite-h1'>My Favourite Episodes</h1>
      <div className="episodes-grid">
        {favoriteEpisodes.map((episode, index) => (
          <div key={episode.episode || index} className="episode-card" onClick={() => handleEpisodeClick(episode)}>
            <h3>{episode.title}</h3>
            <p>{episode.description}</p>
            <audio controls>
              <source src={episode.file} />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFavourites;
