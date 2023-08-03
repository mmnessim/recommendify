import React from "react";

export default function Profile(props) {
    return (
        <div>
        <h1>{props.profile.displayName}</h1>
        <img src={props.profile.photos[0]} alt="profile pic" />
        </div>
    );
}
