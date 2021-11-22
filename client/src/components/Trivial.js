import React from "react";
import socket from "./Socket";

export function Trivial(props) {

    function checkAnswer(answer) {
        if (answer !== props.trivial.correct_answer) {
            alert("Has sido desconectado");
            clearTimeout(props.timeId);
            socket.disconnect();
        }else{
            console.log("correct");
            socket.emit("goHomePage");
            clearTimeout(props.timeId);
           
        }
    }

    return (
        <div id="Trivial">
            <p>{props.trivial.question}</p>
            {props.possiblesAnswer.map((payload) => {
                return (
                    <button className="Answer" onClick={() => checkAnswer(payload)}>{payload}</button>
                )
            })}
        </div>
    )
}