import React, {useState, useEffect} from 'react';
import { getPlaylist } from '../helper/getPlaylist';

export default function ShowPlaylist(props) {
    const [playlist, setPlaylist] = useState(null);
    const [playlistTracks, setPlaylistTracks] = useState(null);

    useEffect(() => {
        if (playlist) {
            setPlaylistTracks(playlist.tracks.items.map((track) => {
                return (
                    <div>
                        <p>{track.track.name}</p>
                        <p>{track.track.artists[0].name}</p>
                        <p>{track.track.album.name}</p>
                    </div>
                )
            }))
        }
    }, [playlist]);

    return (
        <div>
            <h1>Playlist</h1>
            <button onClick={() => {getPlaylist(props, setPlaylist)}}>Get playlist</button>
            { playlist &&
            <div>
                <p>Playlist name: {playlist.name}</p>
                <p>Playlist owner: {playlist.owner.display_name}</p>
                <p>Playlist description: {playlist.description}</p>
                <p>Playlist tracks:</p>
                {playlistTracks}
            </div>
}
        </div>
    )
}
