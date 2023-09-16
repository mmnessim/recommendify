export function getPlaylist(props, callback) {
    fetch(`https://api.spotify.com/v1/playlists/${props.playlistID}`, {
        headers: {
            Authorization: 'Bearer ' + props.token
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            callback(data);
        })
        .catch(err => console.log(err));
}
