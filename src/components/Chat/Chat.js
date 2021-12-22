import React, { useState, useEffect } from "react";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
import queryString from 'query-string';
import io from 'socket.io-client';
import "./Chat.css";
let socket;

function Chat(){
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const ENDPOINT = "https://chat-application-backend-react.herokuapp.com/"; //Server Location

    useEffect(() =>{ //This Hook(useEffect) is used for User Detail
        //window.location.search = ?name=name&room=room (Search Query)
        //window.location = url of the page
        const {name, room} = queryString.parse(window.location.search); //Getting name and room data from url like 'localhost:3000/chat?name=name&room=room', here we extract data about ?name=name&room=room which is a search query and extract values of name and room.
        // console.log(name, " ", room);
        socket = io(ENDPOINT,{ transports: ['websocket'] }); //Creating instance of io of Socket.io-client 
        setName(name); //Setting name value
        setRoom(room); //Setting room value
        // console.log(name, " ", room);
        socket.emit("join", {name: name, room: room}, ({error}) => {//1st Parameter is the Event, 2nd Parameter is the data that is send to backend, and third is the callback function which is called from the backend but it runs or is executed on the frontend, the data send from the backend through callback function can be accessed in the frontend.
            window.alert(error);
        }); //This is an Event: Join, which will be triggered from backend. Emit is used to call the function in the backend and can also pass data such as name and room. Emit can contain any string as first perimeter that is recognised by the backend.
        socket.on("allUsers", ({users}) => {
            setCurrentUser(currentUser => users);
        });
        return () => { //This Return function will be executed when there is change in the "ENDPOINT" or "window.location.search" attribute. This is for cleanup like disconnection the use and deleting the "socket" element.
            socket.disconnect(); //Disconnect a User from socket
            socket.off(); //Deleting the "socket" instance because it's of no use now
        }
    }, [ENDPOINT, window.location.search]); //The sideeffect(useEffect will auto run when there is change in the ENDPOINT or search query(window.location.search))

    useEffect(() => {
        socket.on("message", (message) => { //message is an object which is send from backend. message contain user detail and text 
            // console.log(message);
            setMessages(messages => [ ...messages, message ]); //This method is used to add element to the messages array.
        });

        socket.on("allUsers", ({users}) => {
            setCurrentUser(currentUser => users);
        });
    },[]);
    const sendMessage = (event) => { //This function is Triggered when the user press "Enter Button" to send the message.
        event.preventDefault(); //It is used to prevent page reload when "Enter Button" is pressed.
        if(message){
            socket.emit("sendMessage", message, () => {
                setMessage(""); //Once the message is send then the input field is empty by setting the message as blank string("");
            }); 
        }
    }
    // console.log("Message: ", message);
    // console.log("Messages: ",messages);
    return(
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
            <TextContainer users={currentUser} />
        </div>
    );
}

export default Chat;
