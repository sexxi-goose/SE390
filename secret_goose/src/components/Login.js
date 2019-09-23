import React from 'react';
import './../Login.css';

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: "",
      username: ""
    };
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
    context.history.push('/game')


  }

  handleJoin = (event) => {
    event.preventDefault();
    var request = new XMLHttpRequest();

    request.open('POST', '/join', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({ roomId: this.state.roomId,
                              username: this.state.username }));
    this.routeToGame();
  }
  handleCreate = (event) => {
    event.preventDefault();
    var request = new XMLHttpRequest();

    request.open('POST', '/create', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({ roomId: this.state.roomId,
                              username: this.state.username }));
    this.routeToGame();
  }

  render() {
    const isEnabled = this.state.roomId.length > 0 && this.state.username.length > 0;

    return (
      <form onSubmit={this.handleSubmit} class="center" noValidate >
        <label>
          <span>Room ID: </span>
          <input type="text" name="room_id" placeholder="Enter Room ID" required
          onChange={this.handleChange} />
        </label>

        <br/>

        <label>
          <span>Username: </span>
          <input type="text" name="username" placeholder="Enter Username" required
          onChange={this.handleChange} />
        </label>

        <br/>

        <button disabled={!isEnabled} type="submit" value="Create" onClick={this.handleCreate}>
            Create
        </button>
        <button disabled={!isEnabled} type="submit" value="Join" onClick={this.handleJoin}>
            Join
        </button>
      </form>
    );
  }
}
