import React, { useState, useEffect } from "react";
import { GlobalChat } from "./GlobalChat";
import { PrivateChat } from "./PrivateChat";

export function HomePage(props) {
    const [globalChat, setGlobalChat] = useState("HomePage");
    const [privateChat, setPrivateChat] = useState("");
    const [myId, setMyId] = useState("");

    var userlist = props.userlist;


    function goGlobalChat() {
        setGlobalChat("GlobalChat");
    }

    function goHomePage() {
        setGlobalChat("HomePage");
    }

    function goPrivateChat(userId) {
        setGlobalChat("PrivateChat");
        setPrivateChat(userId);
        
        console.log(userId);
    }

    // function GoPrivateChat(props) {
    //     useEffect(()=>{
    //         userlist.map((users) => {
    //             if (users.name === props.usr) {
    //                 console.log(users.name);
    //                 setPrivateChat(users.id);
    //             }
    //         })
    //     },[])
        
    //     return (
    //         <button className="PrivateChatButton" onClick={goPrivateChat}>{props.usr}</button>
    //     );
    // }

    return (
        <div id="HomePageContainer">
            <div id="Header">
                <div id="UserName">
                    {props.name}
                </div>
                {globalChat !== "HomePage" &&
                    <button onClick={goHomePage}>🡰</button>
                }
            </div>
            {globalChat === "HomePage" &&
                <div id="HomePageContent">
                    <div id="GlobalChatButton">
                        <button id="GoToGlobalChat" onClick={goGlobalChat}>Global Chat</button>
                    </div>
                    {props.userlist.map((user, i) => {
                        if (user.name !== props.name) {
                            return (
                                <div className="UsersList">
                                    <div className="User">
                                        {/* <GoPrivateChat usr={user.name} /> */}
                                        <button className="PrivateChatButton" onClick={()=> goPrivateChat(user.id)}>{user.name}</button>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            }


            {globalChat === "GlobalChat" &&

                <GlobalChat name={props.name} messages={props.messages} currentPage={globalChat} />
            }
            {globalChat === "PrivateChat" &&
                <PrivateChat name={props.name} myId={myId} privateMessages={props.privateMessages} currentPage={globalChat} id={privateChat} />
            }

        </div>
    )
}