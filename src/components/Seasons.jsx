import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import '../index.css';

const Seasons = () => {
  const { showId } = useParams();
  const location = useLocation();
  const { description } = location.state;
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
        if (!response.ok) {
          throw new Error(`Error fetching show data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched show data:', data);
        setShow(data);
      } catch (error) {
        console.error('Error fetching show data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [showId]);

  const handleSeasonClick = (seasonIndex) => {
    navigate(`/seasons/${showId}/episodes/${seasonIndex}`);
  };

  if (loading) return <div>Loading...</div>;
  if (!show) return <div>No show data available</div>;

  return (
    <div className="main-content">
      <h2>{show.title}</h2>
      <p>{description}</p>
      <div className="seasons-grid">
        {show.seasons && show.seasons.length > 0 ? (
          show.seasons.map((season, index) => (
            <div key={index} className="season-card" onClick={() => handleSeasonClick(index)}>
              <img src={season.image} alt={season.title} className="season-image" />
              <h3>{season.title}</h3>
              <small>Updated: {new Date(season.updated).toLocaleDateString()}</small>
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
