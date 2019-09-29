import React from 'react';
import './../Style/Login.css';
import { Redirect } from 'react-router-dom'
import socketIOClient from 'socket.io-client'

const REQUEST_USERID_ROOMID = "SendUseridRoomid"
const RESPONSE_USERID_ROOMID = "UseridRoomid"
const NEW_USER_JOINED_ROOM = "NewUserJoinedRoom"
const ENDPOINT = ""


function Header(display) {
    return (
        <div id="TopTitle" className="center">
        <h1 id="LoginTitle">SecretGOOSE</h1>
        </div>
    );
}

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
        user_id: this.userId
      });
    });
  }

  handleJoinRoom = async (event) => {
    event.preventDefault();

    const response = await fetch('/join', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          room_id: this.state.roomId,
          username: this.state.username
        }),
    });

    const responseJson = await response.json();
    if (!response.ok) {
      alert(responseJson["error"]);
      return;
    }

    this.userId = responseJson["user_id"]

    this.setupWebsocket();
    this.routeToGame();
  }

  handleCreateRoom = async (event) => {
    event.preventDefault();
    const response = await fetch('/create', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          room_id: this.state.roomId,
          username: this.state.username
        }),
    });


    const responseJson = await response.json();
    if (!response.ok) {
      alert(responseJson["error"]);
      return;
    }

    this.userId = responseJson["user_id"]

    this.setupWebsocket();
    this.routeToGame();
  }


  render() {
    const isEnabled = this.state.roomId.length > 0 && this.state.username.length > 0;

    if(this.state.redirectToGame){
      const redirectUrl = "/lobby/" + this.state.roomId;
      return <Redirect to={redirectUrl} />
    }

    return (
      <div>
      <Header></Header>
        <form onSubmit={this.handleSubmit} className="center loginForm" noValidate >
          <div className="input">
            <label>
              <span className="roomid">Room ID: </span>
              <input type="text" name="roomId" placeholder="Enter Room ID" required
              onChange={this.handleChange} maxLength="8"/>
            </label>

            <br/>

            <label>
              <span>Username: </span>
              <input type="text" name="username" placeholder="Enter Username" required
              onChange={this.handleChange} maxLength="10"/>
            </label>
          </div>

          <br/>

          <div className="submitButtons">
            <button disabled={!isEnabled} type="submit" value="Create" onClick={this.handleCreateRoom} className="button">
                Create
            </button>
            <div className="spacer"></div>
            <button disabled={!isEnabled} type="submit" value="Join" onClick={this.handleJoinRoom} className="button">
                Join
            </button>
          </div>
        </form>
      </div>
    );
  }
}
