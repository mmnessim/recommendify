import React, {useState, useEffect} from 'react';
import ShowPlaylist from './showPlaylist';
import { useSelector, useDispatch } from 'react-redux';

export default function CreatePlaylist(props) {
    const profile = useSelector((state) => state.profile);
    const token = useSelector((state) => state.token.token);
    const dispatch = useDispatch();
    
    const [playlistName, setPlaylistName] = useState(null);
    const [playlistDescription, setPlaylistDescription] = useState(null); // optional
    const [playlistID, setPlaylistID] = useState(null);
    const [error, setError] = useState(null);

    function createPlaylist() {
        fetch('https://api.spotify.com/v1/users/' + profile.id + '/playlists', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: playlistName,
                "description": playlistDescription // Not working for some reason
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                dispatch({type: 'playlistID/login', payload: data.id});
                setPlaylistID(data.id);
                if (data.error) {
                    setError(data.error.message);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <h1>Create playlist</h1>
            <input type="text" placeholder="Enter a playlist name" onChange={(e) => setPlaylistName(e.target.value)} />
            <br />
            <input type="text" placeholder="Enter a playlist description" onChange={(e) => setPlaylistDescription(e.target.value)} />
            <br />

            <button onClick={createPlaylist}>Create a playlist</button>
            {
                error &&
                <p>Error: {error}</p>
            }
            { playlistID &&
            <div>
                <p>Playlist ID: {playlistID}</p>
                <ShowPlaylist token={token} playlist={playlistID} />
            </div>
            }
        </div>
    )
}
