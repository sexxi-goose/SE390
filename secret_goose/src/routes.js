import React from "react";
import { Route } from "react-router-dom";
import {GameRoom} from "./components/Game";
import Lobby from "./components/Lobby";
import {LoginForm} from './components/Login.js';

class ReactRouter extends React.Component {
  render() {
    const login = new LoginForm();

    return (
      <React.Fragment>
        <Route exact path="/" component={LoginForm} />
        <Route  path="/lobby/:roomNum" component={Lobby} />
        <Route  path="/game/:roomNum" component={GameRoom}/>
      </React.Fragment>
    );
  }
}

export default ReactRouter;
