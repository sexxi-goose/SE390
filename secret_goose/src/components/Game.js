import React from 'react';
import './../Game.css';
import Header from "./Header";

function GenerateBoard(data) {
  return (<div class="Game-Right">
    <table class="Boards">
      <tr>
        <th>
          <div class="Card" id={data.name}>
          </div>
        </th>
        <th>
          <div class="Card" id={data.name}>
          </div>
        </th>
        <th>
          <div class="Card" id={data.name}>
          </div>
        </th>
        <th>
          <div class="Card" id={data.name}>
          </div>
        </th>
        <th>
          <div class="Card" id={data.name}>
          </div>
        </th>
      </tr>
    </table>
  </div>);
}

function GenerateElectionTracker(data) {
  return (<div class="Game-Right">
    <table class="Boards">
      <tr>
        <th>
          <div class="Circle">
          </div>
        </th>
        <th>
          <div class="Circle">
          </div>
        </th>
        <th>
          <div class="Circle">
          </div>
        </th>
        <th>
          <div class="Circle">
          </div>
        </th>
      </tr>
    </table>
  </div>);
}


function Game() {
  return (
    <div>
    <Header code="23456" />
  <div class="Game">
    <div class="Game-Left">
      <table class="PlayerNames">
        <tr>
          <th>Player1</th>
        </tr>
        <tr>
          <th>Player2</th>
        </tr>
        <tr>
          <th>Player3</th>
        </tr>
        <tr>
          <th>Player4</th>
        </tr>
        <tr>
          <th>Player5</th>
        </tr>
      </table>
      <div id="DisplayButton">
        <button type="button">Display Role</button>
      </div>
      
    </div>
    <GenerateBoard name="Good"/>
    <GenerateBoard name="Evil"/>
    <GenerateElectionTracker name="Evil"/>
  </div>
  </div>
  );
}

export default Game;