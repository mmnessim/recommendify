import React from "react";
import Recommendations from "./recommendations";

export default function Profile(props) {
    return (
        <div className="container">
            <div className="row">
                <h1>{props.profile.displayName}</h1>
                {
                    props.profile.images &&
                    <img src={props.profile.images[0].url} alt="profile pic" />
                }
            </div>
            <div className="row">
                <div className="col-sm">
                    <Recommendations token={props.token} />
                </div>
                <div className="col-sm">
                    <h1>Hello</h1>
                </div>
            </div>

        </div>
    );
}
