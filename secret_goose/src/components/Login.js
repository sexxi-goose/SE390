import React from 'react';
import './../Style/Login.css';
import { Redirect } from 'react-router-dom'
import {Socket} from './Socket'
import Header from "./Header";


export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: "",
      username: "",
      redirectToGame: false
    };

    this.socketConnection = new Socket();
    this.socketConnection.addResponse(this.socketConnection.NEW_USER_JOINED_ROOM, data => {
      console.log(data["username"] + " joined the room");
    });
    this.socketConnection.addResponse(this.socketConnection.REQUEST_USERID_ROOMID, (data) => {
      this.socketConnection.sendEvent(this.socketConnection.RESPONSE_USERID_ROOMID, {
        room_id: this.state.roomId,
        user_id: this.userId
      });
    });
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

    this.routeToGame();
  }

  render() {
    const isEnabled = this.state.roomId.length > 0 && this.state.username.length > 0;

    if(this.state.redirectToGame){
      const redirectUrl = "/lobby/" + this.state.roomId;
      return <Redirect to={redirectUrl} />
    }

    return (
      <form onSubmit={this.handleSubmit} class="loginForm" noValidate >
        <div class="input">
          <label>
            <span>Room ID: </span>
            <input type="text" name="roomId" placeholder="Enter Room ID" required
            onChange={this.handleChange} maxlength="8"/>
          </label>

          <br/>

          <label>
            <span>Username: </span>
            <input type="text" name="username" placeholder="Enter Username" required
            onChange={this.handleChange} maxlength="10"/>
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
