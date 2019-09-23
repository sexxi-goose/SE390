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
    const show = display.value;
    return (
        <div id="Top">
        <h1 id="Title">SecretGOOSE</h1>
        <RoomCode value={display.code}/>
        </div>
    );
}

export default Header;
