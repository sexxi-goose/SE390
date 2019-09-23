import React from 'react';
import './../Style/Login.css';
import { Redirect } from 'react-router-dom'
import socketIOClient from 'socket.io-client'

const REQUEST_USERID_ROOMID = "SendUseridRoomid"
const RESPONSE_USERID_ROOMID = "UseridRoomid"
const NEW_USER_JOINED_ROOM = "NewUserJoinedRoom"
const ENDPOINT = ""

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: "",
      username: "",
      redirectToGame: false
    };

    this.socketConnection = null
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  routeToGame = () => {
    this.setState({redirectToGame:true})
  }

  setupWebsocket = () => {
    this.socketConnection = socketIOClient(ENDPOINT);
    this.socketConnection.on(NEW_USER_JOINED_ROOM, data => {
      console.log(data["username"] + " joined the room");
    });

    this.socketConnection.on(REQUEST_USERID_ROOMID, (data) => {
      this.socketConnection.emit(RESPONSE_USERID_ROOMID, {
        room_id: this.state.roomId,
        user_id: this.state.username
      });
    });
  }

  handleJoinRoom = (event) => {
    event.preventDefault();

    fetch('/join', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          room_id: this.state.roomId,
          username: this.state.username
        }),
    });

    this.setupWebsocket();
    this.routeToGame();
  }

  handleCreateRoom = (event) => {
    event.preventDefault();
    fetch('/create', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          room_id: this.state.roomId,
          username: this.state.username
        }),
    });

    this.setupWebsocket();
    this.routeToGame();
  }

  render() {
    const isEnabled = this.state.roomId.length > 0 && this.state.username.length > 0;

    if(this.state.redirectToGame){
      return <Redirect to='/game' />
    }

    return (
      <form onSubmit={this.handleSubmit} class="center" noValidate >
        <div class="input">
          <label>
            <span>Room ID: </span>
            <input type="text" name="roomId" placeholder="Enter Room ID" required
            onChange={this.handleChange} />
          </label>

          <br/>

          <label>
            <span>Username: </span>
            <input type="text" name="username" placeholder="Enter Username" required
            onChange={this.handleChange} />
          </label>
        </div>

        <br/>

        <div class="submitButtons">
          <button disabled={!isEnabled} type="submit" value="Create" onClick={this.handleCreateRoom}>
              Create
          </button>
          <div class="spacer"></div>
          <button disabled={!isEnabled} type="submit" value="Join" onClick={this.handleJoinRoom}>
              Join
          </button>
        </div>
      </form>
    );
  }
}
