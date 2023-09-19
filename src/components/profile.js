import React from "react";
import Recommendations from "./recommendations";
import PlaylistContainer from "./playlistContainer";
import { useSelector } from "react-redux";

export default function Profile() {
    const profile = useSelector((state) => state.profile);
    const token = useSelector((state) => state.token.token);

    return (
        <div className="container">
            <div className="row">
                <h1>{profile.displayName}</h1>
                {
                    profile.images &&
                    <img src={profile.images[0].url} alt="profile pic" />
                }
            </div>
            <div className="row">
                <div className="col-sm">
                    <Recommendations />
                </div>
                <div className="col-sm">
                    <PlaylistContainer token={token} profile={profile}/>
                </div>
            </div>

        </div>
    );
}
