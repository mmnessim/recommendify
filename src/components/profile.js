import React from "react";
import Recommendations from "./recommendations";

export default function Profile(props) {
    return (
        <div>
        <h1>{props.profile.displayName}</h1>
        {
            props.profile.images &&
            <img src={props.profile.images[0].url} alt="profile pic" />
        }
        <Recommendations token={props.token} />
        </div>
    );
}
