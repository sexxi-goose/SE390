import React from 'react';
import './../Game.css';
import Header from "./Header";
import GoodCard from '../assets/GoodCard.png';
import BadCard from '../assets/EvilCard.png';

function GenerateGoodBoard(data) {
  return (<div class="Game-Right">
    <table class="Boards">
      <tr>
        <th>
          <div class="Card">
            {data.value >= 1 &&
            <img src={GoodCard}/>}
          </div>
        </th>
        <th>
          <div class="Card">
            {data.value >= 2 &&
            <img src={GoodCard}/>}
          </div>
        </th>
        <th>
          <div class="Card">
            {data.value >= 3 &&
            <img src={GoodCard}/>}
          </div>
        </th>
        <th>
          <div class="Card">
            {data.value >= 4 &&
            <img src={GoodCard}/>}
          </div>
        </th>
        <th>
          <div class="Card">
            {data.value >= 5 &&
            <img src={GoodCard}/>}
          </div>
        </th>
      </tr>
    </table>
    <p class="BoardTitles">Good Policies</p>
  </div>);
}

function GenerateBadBoard(data) {
  return (<div class="Game-Right">
    <table class="Boards">
      <tr>
        <th>
          <div class="Card">
          {data.value >= 1 &&
            <img src={BadCard}/>}
          </div>
        </th>
        <th>
          <div class="Card">
          {data.value >= 2 &&
            <img src={BadCard}/>}
          </div>
        </th>
        <th>
          <div class="Card">
          {data.value >= 3 &&
            <img src={BadCard}/>}
          </div>
        </th>
        <th>
          <div class="Card">
          {data.value >= 4 &&
            <img src={BadCard}/>}
          </div>
        </th>
        <th>
          <div class="Card">
          {data.value >= 5 &&
            <img src={BadCard}/>}
          </div>
        </th>
        <th>
          <div class="Card">
          {data.value >= 6 &&
            <img src={BadCard}/>}
          </div>
        </th>
      </tr>
    </table>
    <p class="BoardTitles">Evil Policies</p>
  </div>);
}

function GenerateElectionTracker(data) {
  return (<div class="Game-Right">
    <table class="Boards">
      <tr>
        <th>
          <div class="Circle" id={data.value > 0?"CircleSelect":""}>
          </div>
        </th>
        <th>
          <div class="Circle" id={data.value > 1?"CircleSelect":""}>
          </div>
        </th>
        <th>
          <div class="Circle" id={data.value > 2?"CircleSelect":""}>
          </div>
        </th>
        <th>
          <div class="Circle" id={data.value > 3?"CircleSelect":""}>
          </div>
        </th>
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
  return (
    <div>
    <Header code={match.params.roomNum} />
  <div class="Game">
    <div class="Game-Left">
      <GenerateUserNameTable id="2" prez="0" cha="4" players={players}/>
      <div id="DisplayButton">
        <button type="button">Display Role</button>
      </div>
      
    </div>
    <GenerateGoodBoard value="2"/>
    <GenerateBadBoard value="3"/>
    <GenerateElectionTracker value="2"/>
  </div>
  </div>
  );
}

export default Game;