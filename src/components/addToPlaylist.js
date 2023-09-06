import React, {useState, useEffect} from 'react';
import SelectPlaylist from './selectPlaylist';

export default function AddToPlaylist(props) {
    const [playlist, setPlaylist] = useState(null);
    const [display, setDisplay] = useState(null);
    const [selected, setSelected] = useState(null);
    const [playlistID, setPlaylistID] = useState(null);

    function handleClick(index) {
        console.log(index)
        //setPlaylistID(playlist[index].id);
        console.log(playlist.items[index])
        setPlaylistID(playlist.items[index].id);
        setSelected(true);
    }

    function getPlaylist() {
        fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("Data" + data.items);
                setPlaylist(data);
                /*
                setDisplay(playlist.items.map((item, index) => {
                    return (
                        <div key={index} className='playlists'>
                            <a className='' href={item.external_urls.spotify} target="_blank" rel="noreferrer">{item.name}   </a>
                            <button className='btn' onClick={() => {handleClick(index)}}>+</button>
                        </div>
                    )
                }));*/
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getPlaylist();
    }, []);

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


    return (
        <div>
            <h1>Add to playlist</h1>
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
