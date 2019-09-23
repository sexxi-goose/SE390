import React from 'react';
import './../Login.css';

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room_id: "",
      username: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleJoin   = this.handleJoin.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleJoin(event){
    var request = new XMLHttpRequest();

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
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({ room_id: this.state.room_id,
                              username: this.state.username }));
  }
  handleCreate(event) {
    var request = new XMLHttpRequest();

    request.open('POST', '/create', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({ room_id: this.state.room_id,
                              username: this.state.username }));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} class="center">
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

        <button type="submit" value="Create" onClick={this.handleCreate}>
            Create
        </button>
        <button type="submit" value="Join" onClick={this.handleJoin}>
            Join
        </button>
      </form>
    );
  }
}
