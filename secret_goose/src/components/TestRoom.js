import {Socket} from './Socket';
import React from 'react';
let socket = new Socket();


function handelClick () {
  let data = {
    event_type: socket.RESPONSE_KILL,
    other: "hi"
  }

  socket.sendEvent(socket.GameEvent, data);
};

function testRoom () {
  socket.addResponse(socket.NEW_PRESIDENT, (data) => {  alert(data.result);});
  return     <button onClick={handelClick}> test send event </button>
}
export default testRoom;
