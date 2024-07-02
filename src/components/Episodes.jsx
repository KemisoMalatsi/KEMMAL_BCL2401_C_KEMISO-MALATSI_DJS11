import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { FaHeart } from 'react-icons/fa';
import '../index.css';

const Episodes = () => {
  const { showId, seasonIndex } = useParams();
  const navigate = useNavigate();  // Add the useNavigate hook
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
        if (!response.ok) {
          throw new Error(`Error fetching episodes: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched episodes data:', data);
        const seasonEpisodes = data.seasons[seasonIndex]?.episodes || [];
        setEpisodes(seasonEpisodes);
      } catch (error) {
        console.error('Error fetching episodes data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [showId, seasonIndex]);

  const handlePlay = (event) => {
    if (currentAudio && currentAudio !== event.target) {
      currentAudio.pause();
    }
    setCurrentAudio(event.target);
  };

  const toggleFavorite = (episodeId) => {
    setFavoriteEpisodes((prevFavorites) =>
      prevFavorites.includes(episodeId)
        ? prevFavorites.filter((id) => id !== episodeId)
        : [...prevFavorites, episodeId]
    );
  };

  const handleGoBack = () => {
    navigate(`/seasons/${showId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (!episodes.length) return <div>No episodes available</div>;

  return (
    <div className="main-content">
      <h2>Episodes</h2>
      <button onClick={handleGoBack} className="go-back-button" src={assets.arrow_left}>Go Back to Seasons</button> 
      <div className="episodes-grid">
        {episodes.map((episode, index) => (
          <div key={episode.episode || index} className="episode-card">
            <h3>{episode.title}</h3>
            <p>{episode.description}</p>
            <audio controls onPlay={handlePlay}>
              <source src={episode.file} />
              Your browser does not support the audio element.
            </audio>
            <FaHeart
              className={`heart-icon ${favoriteEpisodes.includes(episode.episode) ? 'favorite' : ''}`}
              onClick={() => toggleFavorite(episode.episode)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Episodes;
