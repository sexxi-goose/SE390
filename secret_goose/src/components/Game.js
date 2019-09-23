import React from 'react';
import './../Style/Game.css';
import Header from "./Header";
import {VoteModal, ChoosePolicyModal, RoleModal, ChooseChancellorModal}  from "./Popups"
import GoodCard from '../assets/GoodCard.png';
import BadCard from '../assets/EvilCard.png';

function GenerateBoard(data) {
  const coll = data.policies.map(function (val, idx) {
    return (<th>
      <div class="Card">
        {data.totalPoliciesPassed > idx &&
        <img src={(data.title === "Good Policies" && GoodCard) || (data.title === "Evil Policies" && BadCard)}/>}
      </div>
  </th>);
  });
  return (<div>
    <table class="Boards">
      <tr>
        {coll}
      </tr>
    </table>
    <p class="BoardTitles">{data.title}</p>
  </div>);
}

function GenerateElectionTracker(data) {
  let coll = [];

  for (let i = 0; i < 4; i++) {
    coll.push(<th>
      <div class="Circle" id={data.electionNum > i?"CircleSelect":""}>
      </div>
    </th>);
  }

  return (<div>
    <table class="Boards">
      <tr>
        {coll}
      </tr>
    </table>
    <p class="BoardTitles">Election Tracker</p>
  </div>);
}

function GenerateUserNameTable(data) {
  const rows = data.players.map(function(name,idx) {
    return (<tr>
      <th>{data.prez == idx && <div class="Icon" id="IconPrez">P</div>}{data.cha == idx && <div class="Icon" id="IconChan">C</div>}</th>
      <th id={data.id == idx && "bold"}>{name}</th>
    </tr>);
  });
  return (<table class="PlayerNames">
    {rows}
    </table>);
}

function Game({match}) {
  const players = ["Logan", "Jenny", "Roxane", "Chris", "Aman"];
  const goodBoard = { 
      title: "Good Policies",
      policies: ["","","","","",""],
      totalPoliciesPassed: 2
  } 
  const evilBoard =  { 
      title: "Evil Policies",
      policies: ["","","","See policy deck","Pass midterms","Pass finals"],
      totalPoliciesPassed: 3
  }
  return (
    <div>
      <Header code={match.params.roomNum} />
      <div class="Game">
        <div class="Game-Left">
          <GenerateUserNameTable id="2" prez="0" cha="4" players={players}/>
          <div id="DisplayButton">
            {RoleModal("Evil", "Goose", ["Player1", "Player2"])}
          </div>
        </div>
        <div class="Game-Right">
          {GenerateBoard(goodBoard)}
          {GenerateBoard(evilBoard)}
          <GenerateElectionTracker electionNum="2"/>
        </div>
      </div>
    </div>
  );
}

export default Game;
