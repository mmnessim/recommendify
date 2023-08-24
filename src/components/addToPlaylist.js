import React, {useState, useEffect} from 'react';

export default function AddToPlaylist(props) {
    const [playlist, setPlaylist] = useState(null);

    function getPlaylist() {
        fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPlaylist(data);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if (playlist) {

        }
    }, [playlist]);


    return (
        <div>
            <h1>Add to playlist</h1>
            <button onClick={getPlaylist}>Get playlist</button>
        </div>
    )
}
