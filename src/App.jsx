import React from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player'; 

const App = () => {
  return (
    <div>
      <div className="container">
        <Sidebar />
      </div>
      <Player />
    </div>
  );  
};

export default App