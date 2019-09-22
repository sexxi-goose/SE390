import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {LoginForm} from './Login.js';

function App() {
  return (
    <LoginForm />
    // <form action="http://localhost:8000/create" method="post">
    //     <input type="text" name="room_id" placeholder="Room id" required /> <br />
    //     <input type="text" name="username" placeholder="username" required /> <br />
    //     <button type="submit">
    //         Submit
    //     </button>
    // </form>
  );
}

export default App;
