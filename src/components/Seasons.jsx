import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../index.css';

const Seasons = () => {
  const { showId } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetch(`/api/id/${showId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched show data:', data);
        setShow(data);
      } catch (error) {
        console.error('Error fetching show data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [showId]);

  const handleSeasonClick = (seasonId) => {
    console.log('Navigating to season with ID:', seasonId); // Debugging statement
    navigate(`/shows/${seasonId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!show) return <div>No show data available</div>;

  return (
    <div>
      <h2>{show.title}</h2>
      <p>{show.description}</p>
      <div className="seasons-grid">
        {show.seasons && show.seasons.length > 0 ? (
          show.seasons.map((season) => (
            <div key={season.id} className="season-card" onClick={() => handleSeasonClick(season.id)}>
              <img src={season.image} alt={season.title} className="season-image" />
              <h3>{season.title}</h3>
            </div>
          ))
        ) : (
          <div>No seasons available</div>
        )}
      </div>
    </div>
  );
};

export default Seasons;
