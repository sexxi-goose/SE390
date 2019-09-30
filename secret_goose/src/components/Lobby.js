import React from 'react';
import './../Style/Lobby.css';
import Header from "./Header";
import {Redirect} from "react-router-dom";
import {socketConnection} from "./Login.js";


export class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToGame: false,
      roomNum: props.match.params.roomNum,
      userId: props.userId,
      players: ["Logan", "Jenny", "Roxane", "Chris", "Aman"]

    };

    this.socketConnection = socketConnection;
    // const

  }

  rowsRendering = (data) => {
    return (
      <table className="LobbyPlayerNames">
        {
          this.state.players.map(function(name,idx) {
            return (
              <tbody key={idx}>
                <tr>
                <th id={parseInt(data.id) === idx ? "bold" :""}>
                  {name}
                </th>
              </tr>
              </tbody>
            );
          })
        }
      </table>
    );
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
    this.setState({redirectToGame:true});
  }


  render() {

    if(this.state.redirectToGame === true){

      const redirectUrl = "/game/" + this.state.roomNum;
      return (<Redirect to={redirectUrl} />);
    }

    return (
      <div>
        {Header(this.state.roomNum)}
        <div className="Lobby">
          <div className="Lobby-Left">
            {this.rowsRendering({id:"2", prez:"0", cha:"4" })}
          </div>
          <div className="Lobby-Right">
            <button  className="LobbyStartButton button" onClick={this.routeToGame} >
                Start Game
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Lobby;
