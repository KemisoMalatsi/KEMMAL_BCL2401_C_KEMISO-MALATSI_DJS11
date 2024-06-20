import React, { useState, useEffect } from 'react';

const Podcasts = () => {
  const [previews, setPreviews] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);

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

  const handleGenreSelect = async (genreId) => {
    try {
      const response = await fetch(`https://podcast-api.netlify.app/genre/${genreId}`);
      const data = await response.json();
      setSelectedGenre(data);
    } catch (error) {
      console.error('Error fetching genre data:', error);
    }
  };

  const handleShowSelect = async (showId) => {
    try {
      const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
      const data = await response.json();
      setSelectedShow(data);
    } catch (error) {
      console.error('Error fetching show data:', error);
    }
  };

  return (
    <div>
      {/* <h1>Podcasts</h1> */}
  
      <div className="image-grid">
        {previews.map((preview) => (
          <div key={preview.id}>
            <img src={preview.image} alt={preview.title} />
            <div>
              <h3>{preview.title}</h3>
              {/* <p>{preview.description}</p> */}
            </div>
          </div>
        ))}
      </div>
  
      {selectedGenre && (
        <div>
          <h2>Selected Genre: {selectedGenre.title}</h2>
          {/* <p>Description: {selectedGenre.description}</p> */}
        </div>
      )}
  
      {selectedShow && (
        <div>
          <h2>Selected Show: {selectedShow.title}</h2>
          {/* <p>Description: {selectedShow.description}</p> */}
          <h3>Seasons:</h3>
          <ul>
            {selectedShow.seasons.map((season) => (
              <li key={season.id}>
                {season.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Podcasts;
