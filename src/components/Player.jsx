import React from 'react'
import { assets } from '../assets/assets';
import { songsData } from '../assets/assets';
import '../index.css'

const Player = () => {
  return (
    <div className='player'>
      <div className='player-left'>
        <img className='player-image' src={songsData[0].image} alt='' />
        <div>
          <p>{songsData[0].name}</p>
          <p>{songsData[0].desc.slice(0, 12)}</p>
        </div>
      </div>
      <div className='player-center'>
        <div className='player-controls'>
          <img className='control-icon' src={assets.shuffle_icon} alt="Shuffle" />
          <img className='control-icon' src={assets.prev_icon} alt="Previous" />
          <img className='control-icon' src={assets.play_icon} alt="Play" />
          <img className='control-icon' src={assets.next_icon} alt="Next" />
          <img className='control-icon' src={assets.loop_icon} alt="Loop" />
        </div>
        
        <div className="timeline">
          <p className="current-time">1:06</p>
          <div className="timeline-bar">
            <hr className="progress-bar" />
          <p className="total-time">3:20</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;