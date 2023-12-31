import React, {useState, useEffect, useCallback} from 'react';
import SelectPlaylist from './selectPlaylist';
import { useSelector, useDispatch } from 'react-redux';

export default function AddToPlaylist(props) {
    const token = useSelector((state) => state.token.token);

    const [playlist, setPlaylist] = useState(null);
    const [display, setDisplay] = useState(null);
    const [selected, setSelected] = useState(null);
    const [playlistID, setPlaylistID] = useState(null);

    const dispatch = useDispatch();

    const handleClick = useCallback((index) => {
        console.log(playlist.items[index].id);
        setPlaylistID(playlist.items[index].id);
        dispatch({type: 'playlistID/login', payload: {playlistID: playlist.items[index].id}});
        setSelected(true);
    }, [playlist]);

    //Get all playlists
    useEffect(() => {
        if (token && !playlist) {
        fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.items);
                if (data.error) {
                    console.log(data.error.message);
                    setPlaylist(null);
                } else setPlaylist(data);
            })
            .catch(err => console.log(err));
        }
    }, [props.token, props.profile]);

    useEffect(() => {
        if (playlist) {
            setDisplay(playlist.items.map((item, index) => {
                return (
                    <div key={index} className='playlists'>
                        <a className='' href={item.external_urls.spotify} target="_blank" rel="noreferrer">{item.name}   </a>
                        <button className='btn' onClick={() => {handleClick(index)}}>+</button>
                    </div>
                )
            }));
        }
}, [playlist]);

    useEffect(() => {
        console.log(playlist)
    }, [playlist]);

    return (
        <div>
            <h1>Add to playlist</h1>
            {!display &&
            <div>
                <p>Loading...</p>
            </div>
            }

            { !selected &&
            display}
            {selected &&
            <div>
                <button onClick={() => setSelected(false)}>Back</button>
                <SelectPlaylist token={props.token} profile={props.profile} playlistID={playlistID}/>
            </div>
            }
        </div>
    )
}
