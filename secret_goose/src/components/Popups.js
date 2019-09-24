import React from 'react';
import Popup from "reactjs-popup";
import './../Style/Popups.css';
import MrGoose from '../assets/mrgoose.png';
import Geese from '../assets/geese.png';
import Students from '../assets/students.png';


function VoteModal(chancellor, president) {
    return  <Popup trigger={<button className="button"> Open Modal </button>} modal>
    {close => (
      <div className="modal">
        <div className="header"> Vote </div>
        <div className="content">
          <p>President: {president}</p>
          <p>Chancellor: {chancellor}</p>
        </div>
        <div className="actions">
          <button className="button" onClick={() => {close();}}> Yes </button>
          <button className="button" onClick={() => {close();}}> No </button>
        </div>
      </div>
    )}
  </Popup>;
};

function ChoosePolicyModal() {
    return  <Popup trigger={<button className="button"> Open Modal </button>} modal>
    {close => (
      <div className="modal">
        <div className="header"> </div>
        <div className="content"> </div>
        <div className="actions"> </div>
      </div>
    )}
  </Popup>;
};

function RoleModal(team, role, teamMates) {
    let allys = teamMates != null ? <p> Allys: {teamMates.join(", ")} </p> : <p></p>;
    let roleLabel = role != null ? <p> {role}</p> : <p></p>;
    let roleImgName;
    if (role === "Mr. Goose") {
      roleImgName = MrGoose;
    } else if (role === "Geese") {
      roleImgName = Geese;
    } else if (role === "Students") {
      roleImgName = Students;
    }
    return <Popup trigger={<button className="button"> Open Modal </button>} modal>
    {close => (
      <div className="modal">
        <div className="header"> Your Team: {team} </div>
        <div className="content">
          <div class="Card" id={team}>
            <img alt={roleLabel}
              src={roleImgName}/>
          </div>
          {allys}
        </div>
        <div className="actions">
          <button className="button" onClick={() => {close();}}> Close </button>
        </div>
      </div>
    )}
  </Popup>;
};

function ChooseChancellorModal() {
    return  <Popup trigger={<button className="button"> Open Modal </button>} modal>
    {close => (
      <div className="modal">
        <div className="header"> </div>
        <div className="content"> </div>
      </div>
    )}
  </Popup>;
};

export {VoteModal, ChoosePolicyModal, RoleModal, ChooseChancellorModal} ;
