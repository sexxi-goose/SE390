import React from 'react';
import './../Style/App.css';

function App() {
  return (
    <form action="http://localhost:8000/create" method="post">
        <input type="text" name="room_id" placeholder="Room id" required /> <br />
        <input type="text" name="username" placeholder="username" required /> <br />
        <button type="submit">
            Submit
        </button>
    </form>
  );
}

export default App;
