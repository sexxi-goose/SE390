import React from 'react';
import './../Style/Game.css';
import Header from "./Header";
import {VoteModal, ChoosePolicyModal, RoleModal, ChooseChancellorModal}  from "./Popups"
import GoodCard from '../assets/GoodCard.png';
import BadCard from '../assets/EvilCard.png';
export class GameRoom extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      roomNum: props.match.params.roomNum,
      userId: props.userId
    };
    this.socketConnection = null
  }

  GenerateBoard(data) {
    const coll = data.policies.map(function (val, idx) {
      return (
        <th key={idx}>
        <div className="Card">
        {
          data.totalPoliciesPassed > idx &&
          <img
            alt = {(data.title === "Good Policies" && "GoodCard") || (data.title === "Evil Policies" && "BadCard") ||("None")}
            src={(data.title === "Good Policies" && GoodCard) ||(data.title === "Evil Policies" && BadCard)}
          />
        }
        </div>
        </th>
      );
    });
    return (<div>
      <table className="Boards">
        <tbody>
          <tr>
            {coll}
          </tr>
        </tbody>
      </table>
      <p className="BoardTitles">{data.title}</p>
    </div>);
  }

  GenerateElectionTracker(data) {
    let coll = [];
    for (let i = 0; i < 4; i++) {
      coll.push(<th key={i}>
        <div className="Circle" id={data.electionNum > i?"CircleSelect":""}></div>
      </th>);
    }
    return (<div>
      <table className="Boards">
        <tbody>
          <tr>{coll}</tr>
        </tbody>
      </table>
      <p className="BoardTitles">Election Tracker</p>
    </div>);
  }

GenerateUserNameTable (data) {
  const rows = data.players.map(function(name,idx) {
    return (
      <tbody key={idx}>
        <tr>
          <th>
            {parseInt(data.prez) === idx && <div className="Icon" id="IconPrez">P</div>}
            {parseInt(data.cha) === idx && <div className="Icon" id="IconChan">C</div>}
          </th>
          <th id={parseInt(data.id) === idx ? "bold" :""}>{name}</th>
        </tr>
      </tbody>);
  });
  return (<table className="PlayerNames">{rows}</table>);
}

render() {
  const players = ["Logan", "Jenny", "Roxane", "Chris", "Aman"];
  const goodBoard = {
      title: "Good Policies",
      policies: ["","","","","",""],
      totalPoliciesPassed: 2
  };

  const evilBoard =  {
      title: "Evil Policies",
      policies: ["","","","See policy deck","Pass midterms","Pass finals"],
      totalPoliciesPassed: 3
  };

  let nameTable = {id:"2", prez:"0", cha:"4", players:players};

  return (
    <div>
      {Header(this.state.roomNum)}
      <div className="Game">
        <div className="Game-Left">
          {this.GenerateUserNameTable (nameTable)}
          <div id="DisplayButton">
            {RoleModal(this.state.roomNum,"Good" , ["hi"], this.state.userId)}
          </div>
        </div>
        <div className="Game-Right">
          {this.GenerateBoard(goodBoard)}
          {this.GenerateBoard(evilBoard)}
          {this.GenerateElectionTracker ({electionNum:"2"})}
        </div>
      </div>
    </div>
  );
}
}
