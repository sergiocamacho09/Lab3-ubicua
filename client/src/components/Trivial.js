import React, { useEffect } from "react";
import socket from "./Socket";

export function Trivial(props) {

    function checkAnswer(answer) {
        if (answer !== props.trivial.correct_answer) {
            socket.disconnect();
        }else{
            clearTimeout(props.timeId);
        }

    }

    return (
        <div id="Trivial">
            <p>{props.trivial.question}</p>
            {props.possiblesAnswer.map((payload) => {
                return (
                    <button class="Answer" onClick={() => checkAnswer(payload)}>{payload}</button>
                )
            })}
        </div>
    )
}