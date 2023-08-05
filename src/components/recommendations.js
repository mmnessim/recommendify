import React, {useState, useEffect} from "react";

export default function Recommendations(props) {
    const [artistID, setArtistID] = useState(null);
    const [query, setQuery] = useState(null);

    function getID() {
        fetch('https://api.spotify.com/v1/search?q=' + query + '&type=artist', {
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setArtistID(data.artists.items[0].id);
            })
            .catch(err => console.log(err));
    }

    return(
        <div>
            <h1>Get Recommendations by Artist</h1>
            <input type="text" placeholder = "Enter an artist" onChange={(e) => setQuery(e.target.value)} />
            <button onClick={getID}>Get Recommendations</button>
            { artistID &&
            <div>
                <p>{artistID}</p>
            </div>
            }
        </div>
    )
}
