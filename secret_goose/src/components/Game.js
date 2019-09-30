import React from 'react';
import './../Style/Game.css';
import Header from "./Header";
import {VoteModal, ChoosePolicyModal, RoleModal, ChooseChancellorModal }  from "./Popups"
import {socketConnection} from "./Login.js";
import GoodCard from '../assets/GoodCard.png';
import BadCard from '../assets/EvilCard.png';
export class GameRoom extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      PlayerNames: [],
      PlayerIds: [],
      roomNum: props.match.params.roomNum,
      userId: props.userId,
      goodPoliciesPassed: 0,
      badPoliciesPassed: 0,
      prez: 0,
      cha: 0,
      failedElections: 0
    };
   this.setUpSocket();
  }

  setUpSocket() {
    socketConnection.addResponse(socketConnection.START_GAME_RESPONSE, (data) =>{
      this.state.PlayerIds = data.players.keys;
      this.state.PlayerNames = data.players.values;
    }  );

    socketConnection.addResponse(socketConnection.NEW_PRESIDENT, (data) =>{
      console.log(data);
      this.state.prez = this.state.PlayerIds.indexOf(data.user_id);
    });

    socketConnection.addResponse(socketConnection.VOTE_CHANCELLOR,  (data) => {VoteModal(this.statePlayerNames[this.state.cha], this.state.userId, this.state.PlayerNames[this.state.prez], this.state.roomNum)});

    socketConnection.addResponse(socketConnection.ELECTED_CHANCELLOR, (data) =>{
      console.log(data);
      this.state.cha = this.state.PlayerIds.indexOf(data.user_id);
    });

    socketConnection.addResponse(socketConnection.PRESIDENT_POLICIES_OPTIONS, (data)=>{
      ChoosePolicyModal(data.policies, socketConnection.PresidentsChoice );
    });

    socketConnection.addResponse(socketConnection.CHANCELLOR_POLICY_OPTIONS, (data)=>{
      ChoosePolicyModal(data.policies, socketConnection.ChancellorsChoice );
    });

    socketConnection.addResponse(socketConnection.NEXT_TURN_POLICIES, (data)=>{
      this.state.goodPoliciesPassed = data.good;
      this.state.goodPoliciesPassed = data.bad;
    });

    // socketConnection.addResponse(socketConnection.REQUEST_KILL);
    //
    // socketConnection.addResponse(socketConnection.BROADCAST_KILL, (data) =>{
    //   console.log(data);
    //   let splitPoint = this.state.PlayerIds.indexOf(data.userId)
    //   this.state.PlayerNames.splice(splitPoint,splitPoint);
    //   this.state.PlayerIds.splice(splitPoint,splitPoint);
    // });

    socketConnection.addResponse(socketConnection.ANNOUNCE_WINNER, (data) => {
        alert(data.result);
      });
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
      totalPoliciesPassed: this.state.goodPoliciesPassed
  };

  const evilBoard =  {
      title: "Evil Policies",
      policies: ["","","","See policy deck","Pass midterms","Pass finals"],
      totalPoliciesPassed: this.state.badPoliciesPassed
  };

  let nameTable = {id:"2", prez:"0", cha:"4", players:players};

  return (
    <div>
      {Header(this.state.roomNum)}
      <div className="Game">
        <div className="Game-Left">
          {this.GenerateUserNameTable (nameTable)}
          <div id="DisplayButton">
            {VoteModal("dfsfds","dfsadf","dsfsdf","dsfsd")}
          </div>
        </div>
        <div className="Game-Right">
          {this.GenerateBoard(goodBoard)}
          {this.GenerateBoard(evilBoard)}
          {this.GenerateElectionTracker ({electionNum:this.state.failedElections})}
        </div>
      </div>
    </div>
  );
}
}
