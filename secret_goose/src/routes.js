import React from "react";
import { Route } from "react-router-dom";
import App from "./components/App";
import Game from "./components/Game";
import Lobby from "./components/Lobby";
// import Header from "../header";

class ReactRouter extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={App} />
        <Route  path="/lobby/:roomNum" component={Lobby} />
        <Route  path="/game/:roomNum" component={Game} />
      </React.Fragment>
    );
  }
}

export default ReactRouter;
