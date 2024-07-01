import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';

const Episodes = () => {
  const { showId, seasonIndex } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (!episodes.length) return <div>No episodes available</div>;

  return (
    <div>
      <h2>Episodes</h2>
      <div className="episodes-grid">
        {episodes.map((episode) => (
          <div key={episode.id} className="episode-card">
            <h3>{episode.title}</h3>
            <p>{episode.description}</p>
            <small>Updated: {new Date(episode.updated).toLocaleDateString()}</small>
            <audio controls onPlay={handlePlay}>
              <source src={episode.file} />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Episodes;
