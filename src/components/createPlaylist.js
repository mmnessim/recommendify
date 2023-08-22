import React, {useState, useEffect} from 'react';
import ShowPlaylist from './showPlaylist';

export default function CreatePlaylist(props) {
    const profile = props.profile;
    const [playlistName, setPlaylistName] = useState('test');
    const [playlistID, setPlaylistID] = useState(null);

    function createPlaylist() {
        fetch('https://api.spotify.com/v1/users/' + profile.id + '/playlists', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: playlistName
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPlaylistID(data.id);
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <h1>Create playlist</h1>
            <p>{profile.id}</p>
            <button onClick={createPlaylist}>Create a playlist</button>
            { playlistID &&
            <div>
                <p>Playlist ID: {playlistID}</p>
                <ShowPlaylist token={props.token} playlist={playlistID} />
            </div>
            }
        </div>
    )
}
