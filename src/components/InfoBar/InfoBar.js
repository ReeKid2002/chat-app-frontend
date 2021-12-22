import React from "react";
import "./InfoBar.css";
function InfoBar({room}) {
    return (
        <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src="http://bit.ly/secondIcon" alt="onlineIcon" />
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer"></div>
            <a href="/"><img src="http://bit.ly/firstIcon" alt="closeIcon" /></a> {/* <a></a> tag is used to redirect to the "/" route when user leaves the chat*/}
        </div>
    );
}

export default InfoBar;
