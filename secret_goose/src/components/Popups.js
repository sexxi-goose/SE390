import React from 'react';
import Popup from "reactjs-popup";
import './../Style/Popups.css';
import MrGoose from '../assets/mrgoose.png';
import Geese from '../assets/geese.png';
import Students from '../assets/students.png';

import GoodCard from '../assets/GoodCard.png';
import BadCard from '../assets/EvilCard.png';
import {socketConnection} from "./Login.js";
// const socketConnection = new Socket();

function VoteModal(chancellor, userid, president, roomId) {

    let selection = (eventField, select) => {
      eventField.preventDefault();
      socketConnection.sendEvent(this.socketConnection.VOTE_FOR_CHANCELLOR, {
        choice: select
      });

    }
    return  <Popup trigger={<button className="button"> Open Modal </button>} modal>
    {close => (
      <div className="modal">
        <div className="header"> Vote </div>
        <div className="content">
          <p>President: {president}</p>
          <p>Chancellor: {chancellor}</p>
        </div>
        <div className="actions">
          <button className="button" onClick={(event)=> {selection(event,true); close();}}> Yes </button>
          <button className="button" onClick={(event)=> {selection(event,false); close();}}> No </button>
        </div>
      </div>
    )}
  </Popup>;
};

function ChoosePolicyModal(policies, who) {
  policies=["L", "L", "F"];

  let selection = (eventField, select) => {
    eventField.preventDefault();
    socketConnection.sendEvent(who, {
      choice: select
    });

  }

  //return index "card" to be discarded
  return(
    <Popup trigger={<button className="button"> Open Modal </button>} modal>
      {close => (
        <div className="modal">
          <div className="header"> Choose a card to discard: </div>
          <div className="policy-content">
            {policies.map(function(currentValue, index){

              return(
                <div className="policyCard" key={index}>
                  <button policycard={index} id={(currentValue === "L" && "Good") || (currentValue === "F" && "Evil")}
                  onClick={(event)=> {selection(event, index); close();}}>
                  <img
                    alt = {(currentValue === "L" && "GoodCard") || (currentValue === "F" && "BadCard") ||("None")}
                    src={(currentValue === "L" && GoodCard) ||(currentValue === "F" && BadCard)}
                  />
                  </button>
                </div>
              );
            })
          }
          </div>
          <div className="actions"> </div>
        </div>
      )}
    </Popup>);

};

function RoleModal(team, role, teamMates, MrGoose) {
    let allys = teamMates != null ? <p> Allys: {teamMates.join(", ")} </p> : <p></p>;
    let supperRole = MrGoose != null ? <p> MrGoose: {MrGoose} </p> : <p></p>;
    let roleLabel = role != null ? <p> {role}</p> : <p></p>;
    let roleImgName;
    if (role === "Mr. Goose") {
      roleImgName = MrGoose;
    } else if (role === "Geese") {
      roleImgName = Geese;
    } else if (role === "Students") {
      roleImgName = Students;
    }
    return <Popup trigger={<button className="button">Your Role</button>} modal>
    {close => (
      <div className="modal">
        <div className="header"> Your Team: {team} </div>
        <div className="content">
          <div className="Card" id={team}>
            <img alt={roleLabel}
              src={roleImgName}/>
          </div>
          {allys}
          {supperRole}
        </div>
        <div className="actions">
          <button className="button" onClick={() => {close();}}> Close </button>
        </div>
      </div>
    )}
  </Popup>;
};

function ChooseChancellorModal(players) {

  let selection = (eventField, select) => {
    eventField.preventDefault();
    socketConnection.sendEvent(socketConnection.NOMINATED_CHANCELLOR, {
      choice: select
    });

  }
  let playerOptions = players.map(p => <option value={p}>{p}</option> )
    return  <Popup trigger={<button className="button"> Open Modal </button>} modal>
    {close => (
      <div className="modal">
        <div className="header"> Select a Chancellor </div>
        <div className="content">
          <form onSubmit={selection}>
            <select name="Chancellor select" size={players.length}>{playerOptions}</select>
            <br></br>
            <input type="submit"></input>
          </form>
        </div>
      </div>
    )}
  </Popup>;
};

export {VoteModal, ChoosePolicyModal, RoleModal, ChooseChancellorModal} ;
