import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../index.css';

const Seasons = () => {
  const { showId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { description } = location.state || {}; 
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
        if (!response.ok) {
          throw new Error(`Error fetching seasons: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched seasons data:', data);
        setSeasons(data.seasons);
      } catch (error) {
        console.error('Error fetching seasons data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasons();
  }, [showId]);

  const handleSeasonClick = (seasonIndex) => {
    navigate(`/seasons/${showId}/episodes/${seasonIndex}`);
  };

  const handleGoBack = () => {
    navigate('/podcasts');
  };

  if (loading) return <div>Loading...</div>;
  if (!seasons.length) return <div>No seasons available</div>;

  return (
    <div className="main-content">
      <h1 className='seasons-h1'>Seasons</h1>
      <button className="go-back-button" onClick={handleGoBack}>Go back to Podcast</button>
      {description && <p>{description}</p>}
      <div className="seasons-grid">
        {seasons.map((season, index) => (
          <div key={season.id || index} className="season-card" onClick={() => handleSeasonClick(index)}>
            <img src={season.image} alt={season.title || `Season ${index + 1}`} />
            <h3>{season.title || `Season ${index + 1}`}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seasons;