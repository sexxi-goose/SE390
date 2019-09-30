import socketIOClient from 'socket.io-client'
import {userid} from "./Login.js";

//Login
const REQUEST_USERID_ROOMID = "SendUseridRoomid";
const RESPONSE_USERID_ROOMID = "UseridRoomid";
const NEW_USER_JOINED_ROOM = "NewUserJoinedRoom";

//Lobby
const START_GAME = "StartGame" // Frontend -> Backend


//Game
const GAME_EVENT = "GameEvent" // Frontend -> Backend, generic filter event

const START_GAME_RESPONSE = "StartGameInfo" // Backend -> Frontend; username->userid mapping

const NEW_PRESIDENT = "President" // Backend -> Frontend; userid of the president, govtFailCount
const NOMINATED_CHANCELLOR = "NominatedChancellor" // Frontend -> Backend; userid of the chancellor
const VOTE_CHANCELLOR = "VoteChancellor" // Backend -> Frontend; userid of the chancellor in case voting is required.
const ELECTED_CHANCELLOR = "ElectedChancellor" // Backend -> Frontend; userid of the chancellor

const PRESIDENT_POLICIES_OPTIONS = "PresidentPolicyOptions" // Backend -> Frontend; good/bad policy count
const PRESIDENT_POLICIES = "PresidentsChoice" // Frontend -> Backend; good/bad policy count of selected policies
const CHANCELLOR_POLICY_OPTIONS = "ChancellorPolicyOptions" // Backend -> Frontend; good/bad policy count of selected policies
const CHANCELLOR_POLICY = "ChancellorsChoice" // Frontend -> Backend; good/bad

const NEXT_TURN_POLICIES = "BadGuyBonus3" // Backend -> Frontend; good/bad policy count
const REQUEST_KILL = "BadGuyBonus45" // Backend->Frontend;
const RESPONSE_KILL = "Kill" // Frontend -> Backend; userid of the killed player
const BROADCAST_KILL = "Killed" // Backend -> Frontend; userid of the killed player

const ANNOUNCE_WINNER = "Winner" // Backend -> Frontend; "Good or Bad"
const ENDPOINT = "";

export class Socket {
  constructor(props) {
    this.socketConnection = socketIOClient(ENDPOINT);
  }

  addResponse(event, reaction){
    this.socketConnection.on(event, data => {
      reaction(data);
    });
  }

  sendEvent(event, data){
    data["eventType"] = event;
    data["sid"] = userid;
    this.socketConnection.emit(GAME_EVENT, data);
  }
}
