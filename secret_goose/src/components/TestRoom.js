import {Socket} from './Socket';
import React from 'react';

import {socketConnection} from "./Login.js";

// let socket = socketConnection;
function handelClick () {
  let data = {
    other: "hi"
  }

  socketConnection.sendEvent(socketConnection.START_GAME, data);
};

function testRoom () {
  socketConnection.addResponse(socketConnection.NEW_PRESIDENT, (data) => {  alert(data.result);});
  return     <button onClick={handelClick}> test send event </button>
}
export default testRoom;
