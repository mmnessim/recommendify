import React, {useEffect, useState} from 'react';
import { keyDisplay } from '../helper/key';

export function SongDetails(props) {
    const [details, setDetails] = useState(null);
    const [key, setKey] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetch('https://api.spotify.com/v1/audio-features/' + props.song.id, {
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                setDetails(data);
            })
            .catch(err => console.log(err));
    }, [props.song.id]);

    useEffect(() => {
        if (details) {
            setKey(keyDisplay(details));
        }
    }, [details]);


    return (
        <div className='song-details'>
            <button className='btn' onClick={() => setShow(!show)}>Show Details</button>
            {details && show &&
            <div>
                <p>Tempo: {details.tempo}</p>
                <p>Key: {key}</p>
                <p>Mode: {details.mode}</p>
                <p>Time Signature: {details.time_signature}</p>
                <p>Acousticness: {details.acousticness}</p>
                <p>Danceability: {details.danceability}</p>
                <p>Energy: {details.energy}</p>
                <p>Instrumentalness: {details.instrumentalness}</p>
                <p>Liveness: {details.liveness}</p>
                <p>Loudness: {details.loudness}</p>
                <p>Speechiness: {details.speechiness}</p>
                <p>Valence: {details.valence}</p>
            </div>}
        </div>
    )
}
