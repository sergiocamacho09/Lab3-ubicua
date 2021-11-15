import React, {useState, useEffect} from 'react';
import { Socket } from 'socket.io-client';
import socket from './Socket';

const Chat = ({name}) =>{
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState("");

    useEffect(() =>{
        socket.emit("userConnected")
    },[name]);
    return (
        
    );
}


export default Chat;