// Shows.js or Shows.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import '../index.css';

const Shows = () => {
  const { seasonId } = useParams();
  const location = useLocation();
  const { seasonTitle } = location.state || {};
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/season/${seasonId}`);
        const data = await response.json();
        console.log('Fetched season shows:', data); // Log the fetched data
        setShows(data);
      } catch (error) {
        console.error('Error fetching season shows:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [seasonId]);

  if (loading) return <div>Loading...</div>;
  if (shows.length === 0) return <div>No shows available</div>;

  return (
    <div>
      <h2>{seasonTitle}</h2>
      <div className="shows-grid">
        {shows.map((show) => (
          <div key={show.id} className="show-card">
            <img src={show.image} alt={show.title} className="show-image" />
            <h3>{show.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shows;
