// Seasons.js or Seasons.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css'; 

const Seasons = () => {
  const { showId } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
        const data = await response.json();
        console.log('Fetched show data:', data); // Log the fetched data
        setShow(data);
      } catch (error) {
        console.error('Error fetching show data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [showId]);

  if (loading) return <div>Loading...</div>;
  if (!show) return <div>No show data available</div>;

  return (
    <div>
      <h2>{show.title}</h2>
      <p>{show.description}</p>
      <div className="seasons-grid">
        {show.seasons && show.seasons.length > 0 ? (
          show.seasons.map((season) => (
            <div key={season.id} className="season-card">
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
