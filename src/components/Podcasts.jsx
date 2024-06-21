import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Podcasts = () => {
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreviews = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPreviews(data);
      } catch (error) {
        console.error('Error fetching previews:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviews();
  }, []);

  const handleImageClick = (showId, description) => {
    navigate(`/seasons/${showId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
