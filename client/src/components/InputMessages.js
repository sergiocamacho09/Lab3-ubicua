import React, { useState, useEffect, useRef } from 'react';
import socket from "./Socket";

/*Saving the last message in order to check is empty*/
let lastMessge = "";

export function InputMessages(props) {
    const [message, setMessage] = useState("");
    const timeId = useRef(null);

    useEffect(() => {
        let lastX = 0;
        let lastY = 0;
        let lastZ = 0;

        // let lastTime = new Date();

        let shaking = false;
        let timer = null;

        const options = {
            threshold: 15
        };

        if ('Accelerometer' in window) {
            try {
                const acc = new window.Accelerometer({ frequency: 60 });
                /*acc.addEventListener("reading", function(){
            
                })*/
                acc.onreading = () => {
                    const deltaX = Math.abs(lastX - acc.x);
                    const deltaY = Math.abs(lastY - acc.y);
                    const deltaZ = Math.abs(lastZ - acc.z);

                    if (((deltaX > options.threshold) && (deltaY > options.threshold)) ||
                        ((deltaX > options.threshold) && (deltaZ > options.threshold)) ||
                        ((deltaY > options.threshold) && (deltaZ > options.threshold))
                    ) {
                        if (!shaking) {
                            console.log('shake');
                            shaking = true;
                            clearTimeout(timeId.current);
                            if (timer) {
                                clearTimeout(timer);
                                timer = null;
                            }
                        }
                    } else {
                        if (shaking) {
                            shaking = false;
                            timer = setTimeout(() => {
                                console.log("stop");
                            }, 500);
                        }
                    }

                    lastX = acc.x;
                    lastY = acc.y;
                    lastZ = acc.z;

                }

                acc.start();
            } catch (err) {
                console.log(err);
            }
        }
    }, []);

    function handleOnClick() {
        if (lastMessge !== "") {
            if (props.currentPage === "GlobalChat") {
                socket.emit("message_evt", props.name, message);
            } else if (props.currentPage === "PrivateChat") {
                socket.emit("message_evt_private", props.id, props.room, props.myId, message);
            }
            document.getElementById("Message").value = "";
            lastMessge = "";
        }
    }

    function sendTemp() {
        timeId.current = setTimeout(() => {
            if (lastMessge !== "") {
                if (props.currentPage === "GlobalChat") {
                    socket.emit("message_evt", props.name, message);
                } else if (props.currentPage === "PrivateChat") {
                    socket.emit("message_evt_private", props.id, props.room, props.myId, message);
                }
                document.getElementById("Message").value = "";
                lastMessge = "";
            }
        }, 5000);
    }

    function handleOnChange(e) {
        setMessage(e.target.value);
        lastMessge = e.target.value;
    }

    return (
        <div className="NewMessage">
            <div id="MessageInputContainer">
                <input id="Message" onChange={handleOnChange} placeholder="Mensaje"></input>
                <button id="ButtonMessage" onClick={handleOnClick}>Enviar</button>
                <button id="TimeButtonMessage" onClick={sendTemp}>Temporizador</button>
            </div>
        </div>
    );
}
