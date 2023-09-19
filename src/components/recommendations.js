import React, {useState} from "react";
import FetchRec from "./fetchRec";
import { useSelector } from "react-redux";

export default function Recommendations(props) {
    const [artistID, setArtistID] = useState(null);
    const [query, setQuery] = useState(null);

    const token = useSelector((state) => state.token.token);

    function getID() {
        fetch('https://api.spotify.com/v1/search?q=' + query + '&type=artist', {
            headers: {
                Authorization: 'Bearer ' + token
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
            <br />
            <button className="btn" onClick={getID}>Get Recommendations</button>
            { artistID &&
            <div>
                <FetchRec artistID={artistID} />
            </div>
            }
        </div>
    )
}
