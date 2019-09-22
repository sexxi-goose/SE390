import React from 'react';

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room_id: "",
      username: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    var request = new XMLHttpRequest();

    request.open('POST', '/create', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    request.setRequestHeader('Access-Control-Allow-Credentials', 'true');
    request.send(JSON.stringify({ room_id: this.state.room_id,
                              username: this.state.username }));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <span>Room ID: </span>
          <input type="text" name="room_id" placeholder="Enter Room ID" required
          onChange={this.handleChange} />
        </label>

        <br/>

        <label>
          <span>Username: </span>
          <input type="text" name="username" placeholder="username" required
          onChange={this.handleChange} />
        </label>

        <br/>

        <button type="submit" value="Submit">
            Submit
        </button>
      </form>
    );
  }
}
