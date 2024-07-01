import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../index.css';

const Home = () => {
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
        setPodcasts(data);
      } catch (error) {
        console.error('Error fetching podcasts data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const handlePodcastClick = (podcast) => {
    navigate(`/seasons/${podcast.id}`, { state: { description: podcast.description } });
  };

  if (loading) return <div>Loading...</div>;
  if (!podcasts.length) return <div>No podcasts available</div>;

  return (
    <div className="main-content">
      <h1>Welcome! Explore the latest Podcasts</h1>
      <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showThumbs={false}>
        {podcasts.map((podcast) => (
          <div key={podcast.id} onClick={() => handlePodcastClick(podcast)} className="carousel-item">
            <img src={podcast.image} alt={podcast.title} />
            <p className="legend">
              {podcast.title}
              <br />
              <small>Updated: {new Date(podcast.updated).toLocaleDateString()}</small>
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Home;