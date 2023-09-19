import React, { useState, useEffect} from 'react';
import { SongDetails } from './songDetails';
import { useSelector } from 'react-redux';


export default function FetchRec(props) {
    const [recs, setRecs] = useState(null);
    const [display, setDisplay] = useState([]);

    const token = useSelector((state) => state.token.token);
    const playlistID = useSelector((state) => state.playlistID.playlistID);

    function addToPlaylist(song) {
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
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

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
    }, [props.artistID]);

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
    }, [recs]);


    return(
        <div>
            <p>Recommendations</p>
            {display}
        </div>
    )
}
