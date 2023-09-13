import React, { useState, useEffect} from 'react';
import { SongDetails } from './songDetails';


export default function FetchRec(props) {
    const [recs, setRecs] = useState(null);
    const [display, setDisplay] = useState([]);

    useEffect(() => {
        setRecs(null);
        fetch('https://api.spotify.com/v1/recommendations?seed_artists=' + props.artistID, {
            headers: {
                Authorization: 'Bearer ' + props.token
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
        setDisplay([[]]);
        if (recs) {
            setDisplay(recs.map((rec, index) => {
                return (
                    <div key={index} className='rec-item'>
                        <p>{rec.name}</p>
                        <img src={rec.album.images[0].url} alt="album art" className='pic-sm' />
                        <audio controls src={rec.preview_url} />
                        <p>{rec.artists[0].name}</p>
                        <SongDetails song={rec} token={props.token} />
                    </div>
                )
            }))
        }
    }, [recs, props.artistID]);

    return(
        <div>
            <p>Recommendations</p>
            {display}
        </div>
    )
}
