import React, { useState, useEffect, useCallback } from 'react';
import { SongDetails } from './songDetails';
import { useSelector } from 'react-redux';


export default function FetchRec(props) {
    const [recs, setRecs] = useState(null);
    const [display, setDisplay] = useState([]);
    const [message, setMessage] = useState(null);

    const token = useSelector((state) => state.token.token);
    const playlistID = useSelector((state) => state.playlistID.playlistID);

    const addToPlaylist = useCallback((song) => {
        fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uris: [song.uri]
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.snapshot_id) {
                    setMessage('Song added successfully!')
                } else if (data.error) {
                    setMessage('Error: ' + data.error.message)
                }
            })
            .catch(err => console.log(err));
    }, [playlistID, token]);

    useEffect(() => {
        fetch('https://api.spotify.com/v1/recommendations?seed_artists=' + props.artistID, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.tracks);
                setRecs(data.tracks);
            })
            .catch(err => console.log(err));
    }, [props.artistID, token]);

    useEffect(() => {
        if (recs) {
            setDisplay(recs.map((rec, index) => {
                return (
                    <div key={index} className='rec-item'>
                        <p>{rec.name}</p>
                        <img src={rec.album.images[0].url} alt="album art" className='pic-sm' />
                        <audio controls src={rec.preview_url} />
                        <p>{rec.artists[0].name}</p>
                        <br />
                        <button className='btn' onClick={() => addToPlaylist(rec)}>Add to Selected Playlist</button>
                        <SongDetails song={rec} token={token} />
                    </div>
                )
            }))
        }
    }, [recs, token, addToPlaylist]);


    return(
        <div>
            <p>Recommendations</p>
            {message && <p>{message}</p>}
            {display}
        </div>
    )
}
