import React from 'react';

const Header: React.SFC = () => {
  return (
    <nav className="relative h-full flex items-center justify-between flex-wrap p-6 bg-teal-500 text-white">
      <div className="absolute top text-center w-32 -ml-32" style={{ left: '50%' }}>
        <h2 className="text-lg font-bold">Todo DND</h2>
      </div>
    </nav>
  )
}

export default Header;
