import React from 'react';
import './../Style/Header.css';

function RoomCode(code) {
  return ( <div id="RoomCode"> <p>{code}</p></div>);
}

function Header(display) {
    return (
        <div id="Top">
        <div className="roomCode">
          {RoomCode(display)}
        </div>
        <h1 id="Title">SecretGOOSE</h1>
        </div>
    );
}

export default Header;
