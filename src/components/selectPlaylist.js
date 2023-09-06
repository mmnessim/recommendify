import React, {useState, useEffect} from "react";

export default function SelectPlaylist(props) {
    const [playlist, setPlaylist] = useState(null);
    const [display, setDisplay] = useState(null);

    function getPlaylist() {
        fetch(`https://api.spotify.com/v1/playlists/${props.playlistID}`, {
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
        getPlaylist();
    }, []);

    useEffect(() => {
        if (playlist) {
            setDisplay(playlist.tracks.items.map((item, index) => {
                return (
                    <div key={index} className='playlists'>
                        something
                    </div>
                )
            }));
        }
    }, [playlist]);



    return(
        <div>
            <p>Playlist</p>
        </div>
    )
}
