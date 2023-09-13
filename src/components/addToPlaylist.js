import React, {useState, useEffect, useCallback} from 'react';
import SelectPlaylist from './selectPlaylist';
import store from '../redux/store';

export default function AddToPlaylist(props) {
    const [playlist, setPlaylist] = useState(null);
    const [display, setDisplay] = useState(null);
    const [selected, setSelected] = useState(null);
    const [playlistID, setPlaylistID] = useState(null);
    //Variables from store
    const profile = store.getState().profile;
    const token = store.getState().token.token;

    const handleClick = useCallback((index) => {
        //console.log(index)
        //console.log(playlist.items[index])
        setPlaylistID(playlist.items[index].id);
        setSelected(true);
    }, [playlist]);

    //Get all playlists
    useEffect(() => {
        //getPlaylist();
        fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("Data" + data.items);
                setPlaylist(data);
                setDisplay(playlist.items.map((item, index) => {
                    return (
                        <div key={index} className='playlists'>
                            <a className='' href={item.external_urls.spotify} target="_blank" rel="noreferrer">{item.name}   </a>
                            <button className='btn' onClick={() => {handleClick(index)}}>+</button>
                        </div>
                    )
                }));
            })
            .catch(err => console.log(err));
    }, [profile]);


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
