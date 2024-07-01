import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Podcasts = ({ sortCriteria }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/');
        if (!response.ok) {
          throw new Error(`Error fetching podcasts: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched podcasts data:', data);

        // Sorting logic based on sortCriteria
        let sortedPodcasts = [...data];
        switch (sortCriteria) {
          case 'az':
            sortedPodcasts.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'za':
            sortedPodcasts.sort((a, b) => b.title.localeCompare(a.title));
            break;
          default:
            break;
        }

        setPodcasts(sortedPodcasts);
      } catch (error) {
        console.error('Error fetching podcasts data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, [sortCriteria]);

  const handlePodcastClick = (podcast) => {
    navigate(`/seasons/${podcast.id}`, { state: { description: podcast.description } });
  };

  if (loading) return <div>Loading...</div>;
  if (!podcasts.length) return <div>No podcasts available</div>;

  return (
    <div className="main-content">
      <h2>Podcasts</h2>
      <div className="podcasts-grid">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-card" onClick={() => handlePodcastClick(podcast)}>
            <img src={podcast.image} alt={podcast.title} />
            <h3>{podcast.title}</h3>
            <small>Updated: {new Date(podcast.updated).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podcasts;
