import React from 'react';

const Header: React.SFC = () => {
  return (
    <nav className="h-full flex items-center justify-between flex-wrap p-6">
      <div className="flex items-center flex-shrink-0 mr-6">
        <h2>Todo DND</h2>
      </div>
    </nav>
  )
}

export default Header;
