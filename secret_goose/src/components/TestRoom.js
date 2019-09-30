import {Socket} from './Socket';
import React from 'react';
let socket = new Socket();


function handelClick () {
  let data = {
    other: "hi"
  }

  socket.sendEvent(socket.START_GAME, data);
};

function testRoom () {
  socket.addResponse(socket.NEW_PRESIDENT, (data) => {  alert(data.result);});
  return     <button onClick={handelClick}> test send event </button>
}
export default testRoom;
