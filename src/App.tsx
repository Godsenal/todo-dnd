import React from 'react';
import { Board, Header } from './containers'
function App() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-0 h-20">
        <Header />
      </div>
      <div className="flex-1">
        <Board />
      </div>
    </div>
  );
}

export default App;
