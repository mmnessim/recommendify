import React, {useState, useEffect} from 'react';
import SelectPlaylist from './selectPlaylist';

export default function AddToPlaylist(props) {
    const [playlist, setPlaylist] = useState(null);
    const [display, setDisplay] = useState(null);
    const [selected, setSelected] = useState(null); 

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
                setDisplay(data.items.map((item, index) => {
                    return (
                        <div key={index} className='playlists'>
                            <a className='' href={item.external_urls.spotify} target="_blank" rel="noreferrer">{item.name}   </a>
                            <button className='btn' onClick={() => setSelected(true)}>+</button>
                        </div>
                    )
                }));
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getPlaylist();
    }, []);


    return (
        <div>
            <h1>Add to playlist</h1>
            { !selected &&
            display}
            {selected &&
            <div>
                <button onClick={() => setSelected(false)}>Back</button>
                <SelectPlaylist />
            </div>
            }
        </div>
    )
}
