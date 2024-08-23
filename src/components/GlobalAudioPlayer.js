import React, { useState, useEffect } from 'react';

const GlobalAudioPlayer = () => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(null);

  const playEpisode = (episode) => {
    if (currentAudio && currentAudio.src !== episode.file) {
      currentAudio.pause();
    }
    const audio = new Audio(episode.file);
    setCurrentAudio(audio);
    setCurrentEpisode(episode);
    audio.play();
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (currentAudio && !currentAudio.paused) {
        event.preventDefault();
        event.returnValue = ''; // This triggers the confirmation dialog
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentAudio]);

  return (
    currentEpisode && (
      <div className="global-audio-player">
        <h4>Now Playing: {currentEpisode.title}</h4>
        <audio controls src={currentEpisode.file} />
      </div>
    )
  );
};

export default GlobalAudioPlayer;
