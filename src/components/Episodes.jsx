import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css'; 

const Shows = () => {
  const { seasonId } = useParams();
  const [season, setSeason] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeason = async () => {
      try {
        const response = await fetch(`/api/season/${seasonId}`); // Using the proxy
        const data = await response.json();
        console.log('Fetched season data:', data); // Log the fetched data
        setSeason(data);
      } catch (error) {
        console.error('Error fetching season data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeason();
  }, [seasonId]);

  if (loading) return <div>Loading...</div>;
  if (!season) return <div>No season data available</div>;

  return (
    <div>
      <h2>{season.title}</h2>
      <p>{season.description}</p>
      <div className="shows-grid">
        {season.shows && season.shows.length > 0 ? (
          season.shows.map((show) => (
            <div key={show.id} className="show-card">
              <h3>{show.title}</h3>
              <p>{show.description}</p>
            </div>
          ))
        ) : (
          <div>No shows available</div>
        )}
      </div>
    </div>
  );
};

export default Shows;
