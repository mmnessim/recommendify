import React from "react";
import Recommendations from "./recommendations";

export default function Profile(props) {
    return (
        <div>
        <h1>{props.profile.displayName}</h1>
        <img src={props.profile.photos[0]} alt="profile pic" />
        <Recommendations token={props.token} />
        </div>
    );
}
