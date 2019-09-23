import React from 'react';
import './../Style/Header.css';

function RoomCode(code) {
    if (code && code.value) {
        return (
        <div id="RoomCode">
            <p>{code.value}</p>
        </div>);
    } else {
        return null;
    }
}

function Header(display) {
    return (
        <div id="Top">
        <div class="roomCode">
          <RoomCode value={display.code}/>
        </div>
        <h1 id="Title">SecretGOOSE</h1>
        </div>
    );
}

export default Header;
