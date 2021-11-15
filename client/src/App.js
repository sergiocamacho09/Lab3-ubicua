import React from 'react';
import socketClient from 'socket.io-client';
import './App.css';
const SERVER = "http://localhost:3000/";

function App() {
  const socket = socketClient(SERVER);
  socket.on('connection', () => {
    console.log("Estoy conectado con el back-end");
  });
  return (
    <div className="App">
      HOLA
    </div>
  );
}

export default App;
