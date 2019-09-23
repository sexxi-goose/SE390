import React from 'react';
import './../Style/Lobby.css';
import Header from "./Header";
import {Link} from "react-router-dom";

function GenerateUserNameTable(data) {
  const rows = data.players.map(function(name,idx) {
    return (
      <tbody key={idx}>
        <tr>
        <th id={parseInt(data.id) === idx ? "bold" :""}>
          {name}
        </th>
      </tr>
      </tbody>);
  });
  return (<table className="LobbyPlayerNames">
    {rows}
    </table>);
}

function Lobby({match}) {
  const players = ["Logan", "Jenny", "Roxane", "Chris", "Aman"];
  return (
    <div>
      <Header code={match.params.roomNum} />
      <div className="Lobby">
        <div className="Lobby-Left">
          <GenerateUserNameTable id="2" prez="0" cha="4" players={players}/>
        </div>
        <div className="Lobby-Right">
          <Link to={"/game/" + match.params.roomNum} className="LobbyStartLink" >
            <div className="LobbyStartButton">
              Start Game
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
