// Podcasts.js or Podcasts.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Podcasts = () => {
  const [previews, setPreviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreviews = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app');
        const data = await response.json();
        setPreviews(data);
      } catch (error) {
        console.error('Error fetching previews:', error);
      }
    };

    fetchPreviews();
  }, []);

  const handleImageClick = (showId, description) => {
    navigate(`/seasons/${showId}`, { state: { description } });
  };

  return (
    <div>
      <div className="image-grid">
        {previews.map((preview) => (
          <div key={preview.id} onClick={() => handleImageClick(preview.id, preview.description)} className="podcast-card">
            <img src={preview.image} alt={preview.title} />
            <div>
              <h3>{preview.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podcasts;
