import React, {useState, useEffect} from 'react';

export default function CreatePlaylist(props) {
    const profile = props.profile;
    const [playlistName, setPlaylistName] = useState('');

    return (
        <div>
            <h1>Create playlist</h1>
            <p>{profile.id}</p>
        </div>
    )
}