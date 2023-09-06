import React from 'react';
import AddToPlaylist from './addToPlaylist';
import CreatePlaylist from './createPlaylist';

export default function PlaylistContainer(props) {
    return(
        <div>
            <CreatePlaylist token={props.token} profile={props.profile}/>
            <AddToPlaylist token={props.token} profile={props.profile}/>
        </div>
    )
}