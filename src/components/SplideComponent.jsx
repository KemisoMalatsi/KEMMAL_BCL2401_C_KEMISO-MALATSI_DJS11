import React, { useEffect, useState } from 'react';
import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/splide/dist/css/splide.min.css';

const SplideComponent = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images from the API
    const fetchImages = async () => {
      try {
        const response = await fetch('https://your-api-endpoint.com/images');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setImages(data);  // Assuming data is an array of image objects
        } else {
          throw new Error('Response is not in JSON format');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      // Initialize Splide slider
      const splide = new Splide('.splide', {
        type: 'loop',
        drag: 'free',
        focus: 'center',
        perPage: 3,
        autoScroll: {
          speed: 1,
        },
        breakpoints: {
          640: {
            perPage: 1,
          },
          1024: {
            perPage: 2,
          },
        },
      });

      splide.mount({ AutoScroll });
    }
  }, [images]);

  return (
    <div className="splide">
      <div className="splide__track">
        <ul className="splide__list">
          {images.map((image, index) => (
            <li className="splide__slide" key={index}>
              <img src={image.url} alt={image.alt || 'Image'} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SplideComponent;
