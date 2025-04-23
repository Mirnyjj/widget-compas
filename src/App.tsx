import React from 'react';
import WindDirectionWidget from './CompassWidget';

const App: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}>
      <WindDirectionWidget
        defaultPosition={{x: 50, y: 50}}
        defaultSize={{width: 220, height: 260}}
      />
    </div>
  );
};

export default App;
