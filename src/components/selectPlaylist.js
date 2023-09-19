import React, {useState, useEffect} from "react";
import { getPlaylist } from "../helper/getPlaylist";

export default function SelectPlaylist(props) {
    const [playlist, setPlaylist] = useState(null);
    const [display, setDisplay] = useState(null);

    useEffect(() => {
        getPlaylist(props, setPlaylist);
    }, []);

    useEffect(() => {
        if (playlist) {
            setDisplay(playlist.tracks.items.map((item, index) => {
                return (
                    <div key={index} className='playlists'>
                        <p>{item.track.name} by {item.track.artists[0].name}</p>
                    </div>
                )
            }));
        }
    }, [playlist]);




    return(
        <div>
            {
                playlist &&
                <div>
                    <h3>{playlist.name}</h3>
                </div>
            }
            {display}
        </div>
    )
}
