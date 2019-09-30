import React from "react";
import { Route } from "react-router-dom";
import {GameRoom} from "./components/Game";
import Lobby from "./components/Lobby";
import {Socket} from './components/Socket'


import testRoom from "./components/TestRoom";
import {LoginForm} from './components/Login.js';

const socketConnection = new Socket();


class ReactRouter extends React.Component {
  render() {
    const login = new LoginForm();

    return (
      <React.Fragment>
        <Route  path="" component={LoginForm} />
        <Route  path="lobby/:roomNum" component={Lobby} />
        <Route  path="game/:roomNum" component={GameRoom}/>
        <Route  path="test" component={testRoom}/>
      </React.Fragment>
    );
  }
}

export default ReactRouter;
